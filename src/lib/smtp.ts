import tls from "node:tls";
import net from "node:net";

export interface SendMailOptions {
  host?: string;
  port?: number;
  user?: string;
  pass?: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}

/**
 * Native, zero-dependency SMTP client for Node.js environments.
 * Supports STARTTLS (port 587) and direct SSL (port 465).
 */
export function sendSmtpEmail({
  host = process.env.SMTP_HOST || "smtp.gmail.com",
  port = parseInt(process.env.SMTP_PORT || "587"),
  user = process.env.SMTP_USER || process.env.SMTP_EMAIL || "Email@kayjayglobal.com",
  pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "nvoerxurczggityk",
  from,
  to,
  subject,
  html,
}: SendMailOptions): Promise<{ success: boolean; messageId?: string }> {
  return new Promise((resolve, reject) => {
    let socket: net.Socket;
    let secureSocket: tls.TLSSocket;
    let step = 0;
    const log: string[] = [];

    const timeout = setTimeout(() => {
      if (socket) socket.destroy();
      if (secureSocket) secureSocket.destroy();
      reject(new Error("SMTP Connection Timeout (15s exceeded)"));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
    }

    function handleData(data: Buffer, currentSock: net.Socket | tls.TLSSocket) {
      const response = data.toString();
      log.push("RECV: " + response.trim());

      if (response.startsWith("4") || response.startsWith("5")) {
        cleanup();
        currentSock.end();
        return reject(new Error("SMTP Error: " + response.trim()));
      }

      // STARTTLS Flow (Port 587)
      if (port === 587) {
        if (step === 0 && response.startsWith("220")) {
          step = 1;
          currentSock.write("EHLO localhost\r\n");
        } else if (step === 1 && response.startsWith("250")) {
          step = 2;
          currentSock.write("STARTTLS\r\n");
        } else if (step === 2 && response.startsWith("220")) {
          step = 3;
          secureSocket = tls.connect({
            socket: currentSock,
            host: host,
            rejectUnauthorized: false
          }, () => {
            step = 4;
            secureSocket.write("EHLO localhost\r\n");
          });

          secureSocket.on("data", (d) => handleData(d, secureSocket));
          secureSocket.on("error", (err) => {
            cleanup();
            reject(err);
          });
        } else if (step === 4 && response.startsWith("250")) {
          step = 5;
          secureSocket.write("AUTH LOGIN\r\n");
        } else if (step === 5 && response.startsWith("334")) {
          step = 6;
          const userB64 = Buffer.from(user).toString("base64");
          secureSocket.write(userB64 + "\r\n");
        } else if (step === 6 && response.startsWith("334")) {
          step = 7;
          const passB64 = Buffer.from(pass).toString("base64");
          secureSocket.write(passB64 + "\r\n");
        } else if (step === 7 && response.startsWith("235")) {
          step = 8;
          secureSocket.write(`MAIL FROM:<${user}>\r\n`);
        } else if (step === 8 && response.startsWith("250")) {
          step = 9;
          secureSocket.write(`RCPT TO:<${to}>\r\n`);
        } else if (step === 9 && response.startsWith("250")) {
          step = 10;
          secureSocket.write("DATA\r\n");
        } else if (step === 10 && response.startsWith("354")) {
          step = 11;
          const messageId = `<${Date.now()}.${Math.random().toString(36).substring(2, 9)}@${host}>`;
          const mimeMessage = [
            `From: ${from}`,
            `To: ${to}`,
            `Message-ID: ${messageId}`,
            `Date: ${new Date().toUTCString()}`,
            `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: base64`,
            ``,
            Buffer.from(html).toString("base64"),
            `.`
          ].join("\r\n") + "\r\n";

          secureSocket.write(mimeMessage);
        } else if (step === 11 && response.startsWith("250")) {
          step = 12;
          secureSocket.write("QUIT\r\n");
          cleanup();
          resolve({ success: true });
        }
      }
    }

    try {
      socket = net.createConnection(port, host, () => {
        log.push(`Connected to ${host}:${port}`);
      });

      socket.on("data", (data) => {
        if (step < 3) {
          handleData(data, socket);
        }
      });

      socket.on("error", (err) => {
        cleanup();
        reject(err);
      });
    } catch (err) {
      cleanup();
      reject(err);
    }
  });
}
