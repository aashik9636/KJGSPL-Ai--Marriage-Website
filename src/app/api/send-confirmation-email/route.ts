import { NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName = "Valued Member", 
      email, 
      phone = "Not provided", 
      education = "Not provided", 
      occupation = "Not provided", 
      maritalStatus = "Not provided", 
      city = "Not provided", 
      coreValues = [],
      marriageIntent = "Serious Marriage",
      bio = "Not provided"
    } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL || "Email@kayjayglobal.com";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "nvoerxurczggityk";
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_BCC_EMAIL || "hello@kayjayglobal.com";
    const fromAddress = process.env.SMTP_FROM || `"AI Marriage" <${smtpUser}>`;

    const registrationDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // 1. User Confirmation Email Template (Pure White / Light Theme)
    const userEmailSubject = `Welcome to AI Marriage — Your Profile is Successfully Created, ${fullName}!`;
    const userEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${userEmailSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
    <!-- Header Banner (Light Theme) -->
    <tr>
      <td align="center" style="background-color: #ffffff; padding: 36px 24px 24px; border-bottom: 2px solid #f1f5f9;">
        <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #be185d; margin-bottom: 8px;">
          AI MARRIAGE • INTENTIONAL MATCHMAKING
        </div>
        <h1 style="font-size: 26px; font-weight: 700; margin: 0; color: #0f172a; line-height: 1.3;">
          Welcome to Your Journey
        </h1>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 32px 28px; background-color: #ffffff;">
        <!-- Status Badge -->
        <div style="display: inline-block; background-color: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px; border: 1px solid #a7f3d0;">
          ✓ PROFILE CREATED SUCCESSFULLY
        </div>

        <h2 style="font-size: 20px; font-weight: 600; color: #0f172a; margin: 0 0 12px 0;">
          Hello ${fullName},
        </h2>

        <p style="font-size: 15px; color: #475569; margin: 0 0 24px 0; line-height: 1.6;">
          Thank you for joining <strong>AI Marriage</strong>. Your profile has been successfully created and securely registered in our matchmaking network.
        </p>

        <!-- Profile Details Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <div style="font-size: 12px; font-weight: 800; color: #be185d; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Your Submitted Profile Summary
              </div>
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; color: #1e293b;">
                <tr>
                  <td width="36%" style="color: #64748b; font-weight: 500;">Full Name:</td>
                  <td style="font-weight: 600; color: #0f172a;">${fullName}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 500;">Email Address:</td>
                  <td style="font-weight: 600; color: #0f172a;">${email}</td>
                </tr>
                ${phone !== "Not provided" ? `
                <tr>
                  <td style="color: #64748b; font-weight: 500;">Mobile Number:</td>
                  <td style="font-weight: 600; color: #0f172a;">${phone}</td>
                </tr>` : ""}
                ${education !== "Not provided" ? `
                <tr>
                  <td style="color: #64748b; font-weight: 500;">Education:</td>
                  <td style="font-weight: 600; color: #0f172a;">${education}</td>
                </tr>` : ""}
                ${occupation !== "Not provided" ? `
                <tr>
                  <td style="color: #64748b; font-weight: 500;">Profession:</td>
                  <td style="font-weight: 600; color: #0f172a;">${occupation}</td>
                </tr>` : ""}
                ${city !== "Not provided" ? `
                <tr>
                  <td style="color: #64748b; font-weight: 500;">City / Location:</td>
                  <td style="font-weight: 600; color: #0f172a;">${city}</td>
                </tr>` : ""}
              </table>
            </td>
          </tr>
        </table>

        <!-- Next Steps Card -->
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 10px;">
            What Happens Next?
          </div>
          <ul style="padding-left: 20px; margin: 0; font-size: 13.5px; color: #475569; line-height: 1.6;">
            <li style="margin-bottom: 6px;"><strong>Profile Verification:</strong> Our trust & safety desk reviews your submission for authenticity.</li>
            <li style="margin-bottom: 6px;"><strong>AI Compatibility Matching:</strong> Our algorithm maps core non-negotiables with compatible individuals.</li>
            <li><strong>Curated Introductions:</strong> Handpicked recommendations tailored to your preferences.</li>
          </ul>
        </div>

        <!-- Security Notice -->
        <p style="font-size: 12.5px; color: #64748b; line-height: 1.5; margin: 0 0 24px 0;">
          🔒 <strong>Privacy Assurance:</strong> Your responses and details are strictly confidential and encrypted with high-level security standards.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background-color: #f8fafc; padding: 22px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.6;">
        © 2026 Ai marraige, powered by KayJay Global Solutions. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;

    // 2. Admin Notification Email Template (Pure White / Light Theme)
    const adminEmailSubject = `🔔 New User Registration: ${fullName} (${email})`;
    const adminEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${adminEmailSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
    <!-- Header Banner -->
    <tr>
      <td align="center" style="background-color: #ffffff; padding: 32px 24px 20px; border-bottom: 2px solid #f1f5f9;">
        <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #2563eb; margin-bottom: 6px;">
          ADMIN NOTIFICATION ALERT
        </div>
        <h1 style="font-size: 24px; font-weight: 700; margin: 0; color: #0f172a;">
          New User Registration / Profile Created
        </h1>
      </td>
    </tr>

    <!-- Content Body -->
    <tr>
      <td style="padding: 28px 28px; background-color: #ffffff;">
        <p style="font-size: 14.5px; color: #334155; margin: 0 0 20px 0;">
          A new user has completed registration and created a profile on <strong>AI Marriage</strong>. Below are the submission details:
        </p>

        <!-- Data Table -->
        <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13.5px; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td width="35%" style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
            <td style="font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
            <td style="font-weight: 700; color: #2563eb; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Mobile Number:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Education:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${education}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Profession / Occupation:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${occupation}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Marital Status:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${maritalStatus}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">City / Location:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${city}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Marriage Intent:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${marriageIntent}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Core Values:</td>
            <td style="font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${Array.isArray(coreValues) && coreValues.length > 0 ? coreValues.join(", ") : "None specified"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-weight: 600;">Registration Timestamp:</td>
            <td style="font-weight: 600; color: #0f172a;">${registrationDate}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background-color: #f8fafc; padding: 20px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.6;">
        © 2026 Ai marraige, powered by KayJay Global Solutions. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Dispatch both emails in parallel
    const [userMailResult, adminMailResult] = await Promise.allSettled([
      // 1. Dispatch confirmation email to user
      sendSmtpEmail({
        host: smtpHost,
        port: smtpPort,
        user: smtpUser,
        pass: smtpPass,
        from: fromAddress,
        to: email,
        subject: userEmailSubject,
        html: userEmailHtml,
      }),
      // 2. Dispatch notification email to admin (hello@kayjayglobal.com)
      sendSmtpEmail({
        host: smtpHost,
        port: smtpPort,
        user: smtpUser,
        pass: smtpPass,
        from: fromAddress,
        to: adminEmail,
        subject: adminEmailSubject,
        html: adminEmailHtml,
      }),
    ]);

    if (userMailResult.status === "rejected") {
      console.error("[Email API] Failed to send user confirmation email:", userMailResult.reason);
    } else {
      console.log(`[Email API] Confirmation email sent successfully to user: ${email}`);
    }

    if (adminMailResult.status === "rejected") {
      console.error("[Email API] Failed to send admin notification email:", adminMailResult.reason);
    } else {
      console.log(`[Email API] Admin notification email sent successfully to: ${adminEmail}`);
    }

    return NextResponse.json({
      success: true,
      message: "Emails processed successfully.",
      userEmailSent: userMailResult.status === "fulfilled",
      adminEmailSent: adminMailResult.status === "fulfilled",
    });
  } catch (error: unknown) {
    console.error("[Email API Route Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to dispatch email.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
