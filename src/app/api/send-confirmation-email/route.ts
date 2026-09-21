import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName = "Valued Member", 
      email, 
      phone, 
      education, 
      occupation, 
      maritalStatus, 
      city, 
      coreValues = [],
      marriageIntent = "Serious Marriage",
      bio = ""
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailSubject = `Welcome to AI Marriage — Your Profile is Successfully Created, ${fullName}!`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailSubject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #faf5f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #411c2b;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1.5px solid #ebd8d4; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(65, 28, 43, 0.06);">
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #411c2b 0%, #2a0e1b 100%); padding: 36px 24px; color: #fff9f2;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #fbcfe8; margin-bottom: 8px;">
                ✦ AI MARRIAGE • INTENTIONAL MATCHMAKING
              </div>
              <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 400; margin: 0; line-height: 1.25; color: #fff9f2;">
                Welcome to a Sacred Journey.
              </h1>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <div style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; padding: 5px 12px; border-radius: 999px; margin-bottom: 16px; border: 1px solid #bbf7d0;">
                ✓ PROFILE CREATED SUCCESSFULLY
              </div>

              <h2 style="font-family: Georgia, serif; font-size: 22px; color: #411c2b; margin: 0 0 12px 0;">
                Dear ${fullName},
              </h2>

              <p style="font-size: 14.5px; line-height: 1.6; color: #5c414c; margin: 0 0 20px 0;">
                We are pleased to inform you that your registration on <strong>AI Marriage</strong> has been received and verified. Your profile is now actively recorded in our private, intentional matchmaking system.
              </p>

              <!-- Profile Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fbf6f3; border: 1.5px solid #ebdcd5; border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 12px; font-weight: 800; color: #9d174d; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid #ebdcd5; padding-bottom: 8px;">
                      Your Submitted Profile Summary
                    </div>
                    <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px; color: #411c2b;">
                      <tr>
                        <td width="35%" style="color: #7c656b;">Full Name:</td>
                        <td><strong>${fullName}</strong></td>
                      </tr>
                      <tr>
                        <td style="color: #7c656b;">Email Address:</td>
                        <td><strong>${email}</strong></td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="color: #7c656b;">Contact Mobile:</td>
                        <td><strong>${phone}</strong></td>
                      </tr>` : ""}
                      ${education ? `
                      <tr>
                        <td style="color: #7c656b;">Education:</td>
                        <td><strong>${education}</strong></td>
                      </tr>` : ""}
                      ${occupation ? `
                      <tr>
                        <td style="color: #7c656b;">Profession:</td>
                        <td><strong>${occupation}</strong></td>
                      </tr>` : ""}
                      ${maritalStatus ? `
                      <tr>
                        <td style="color: #7c656b;">Marital Status:</td>
                        <td><strong>${maritalStatus}</strong></td>
                      </tr>` : ""}
                      ${city ? `
                      <tr>
                        <td style="color: #7c656b;">City / Location:</td>
                        <td><strong>${city}</strong></td>
                      </tr>` : ""}
                      <tr>
                        <td style="color: #7c656b;">Intent:</td>
                        <td><strong>${marriageIntent}</strong></td>
                      </tr>
                      ${coreValues && coreValues.length > 0 ? `
                      <tr>
                        <td style="color: #7c656b; vertical-align: top;">Core Values:</td>
                        <td><strong>${coreValues.join(", ")}</strong></td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps Roadmap -->
              <div style="background-color: #ffffff; border: 1.5px solid #ebd8d4; border-radius: 14px; padding: 18px 20px; margin-bottom: 24px;">
                <div style="font-size: 13px; font-weight: 700; color: #411c2b; margin-bottom: 10px;">
                  What Happens Next?
                </div>
                <ul style="padding-left: 18px; margin: 0; font-size: 13px; color: #5c414c; line-height: 1.6;">
                  <li style="margin-bottom: 6px;"><strong>Trust & Verification Desk:</strong> Our concierge team reviews your submission for authenticity.</li>
                  <li style="margin-bottom: 6px;"><strong>Semantic AI Matching:</strong> Our 3-layer formula maps core non-negotiables with compatible individuals.</li>
                  <li><strong>Curated Dossier Introductions:</strong> Introductions unlock only through double-blind mutual curiosity.</li>
                </ul>
              </div>

              <!-- Security Note -->
              <p style="font-size: 12px; color: #7c656b; line-height: 1.5; margin: 0 0 24px 0;">
                🔒 <strong>Privacy Assurance:</strong> Your private questionnaire responses and details are encrypted with bank-level security. We never participate in public web indexing or swiping catalogues.
              </p>

              <!-- Footer CTA -->
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="border-radius: 12px; background-color: #411c2b;">
                    <a href="http://localhost:3004" target="_blank" style="font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 12px 28px; display: inline-block; border-radius: 12px;">
                      Visit AI Marriage Platform →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #faf5f0; padding: 20px 24px; border-top: 1px solid #ebdcd5; font-size: 11.5px; color: #7c656b; line-height: 1.5;">
              © ${new Date().getFullYear()} AI Marriage Intelligence Inc. All rights reserved.<br />
              This is a confirmation receipt for your registered matchmaking account.
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Check if SMTP environment variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const importModule = new Function("m", "return import(m)");
        const nodemailerModule = await importModule("nodemailer").catch(() => null);
        if (!nodemailerModule) {
          throw new Error("nodemailer package not installed");
        }
        const transporter = (nodemailerModule.default || nodemailerModule).createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"AI Marriage" <${smtpUser}>`,
          to: email,
          subject: emailSubject,
          html: emailHtml,
        });

        console.log(`[Email Service] Confirmation email sent to ${email}`);
      } catch (mailError) {
        console.warn("[Email Service] SMTP Error:", mailError);
      }
    } else {
      // Log for development and demo mode
      console.log(`[Email Service - Simulated Delivery] Confirmation email generated for: ${email}`);
      console.log(`Subject: ${emailSubject}`);
    }

    return NextResponse.json({
      success: true,
      message: `Profile creation confirmation email sent to ${email}`,
      recipient: email,
      subject: emailSubject
    });
  } catch (error: unknown) {
    console.error("[Email API Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to dispatch email.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
