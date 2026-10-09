import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let subject = "";
    let message = "";
    let isOffer = false;
    let hrEmail = "";
    let fileBuffer: Buffer | null = null;
    let fileName = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      isOffer = formData.get("is_offer") === "yes";

      if (isOffer) {
        hrEmail = String(formData.get("hr_email") || "").trim();
        const file = formData.get("offer_file") as File | null;
        if (file && file.size > 0) {
          // 5MB limit check
          if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
              { status: "error", message: "File exceeds 5MB size limit." },
              { status: 400 }
            );
          }
          const arrayBuffer = await file.arrayBuffer();
          fileBuffer = Buffer.from(arrayBuffer);
          fileName = file.name;
        }
      } else {
        name = String(formData.get("name") || "").trim();
        email = String(formData.get("email") || "").trim();
        subject = String(formData.get("subject") || "").trim();
        message = String(formData.get("message") || "").trim();
      }
    } else {
      const body = await req.json();
      isOffer = body.is_offer === "yes";
      if (isOffer) {
        hrEmail = String(body.hr_email || "").trim();
      } else {
        name = String(body.name || "").trim();
        email = String(body.email || "").trim();
        subject = String(body.subject || "").trim();
        message = String(body.message || "").trim();
      }
    }

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isOffer) {
      if (!hrEmail || !emailRegex.test(hrEmail)) {
        return NextResponse.json(
          { status: "error", message: "Please provide a valid HR email address." },
          { status: 400 }
        );
      }
      if (!fileBuffer) {
        return NextResponse.json(
          { status: "error", message: "Please attach the offer letter document." },
          { status: 400 }
        );
      }
    } else {
      if (!name || !email || !subject || !message) {
        return NextResponse.json(
          { status: "error", message: "All fields are required." },
          { status: 400 }
        );
      }
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { status: "error", message: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    // SMTP Configuration from Environment Variables
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "0xdevprabhu@gmail.com";

    // If SMTP credentials are not configured in current environment
    if (!smtpEmail || !smtpPassword) {
      console.warn(
        "[API/CONTACT] SMTP credentials are not configured in environment variables (SMTP_EMAIL / SMTP_PASSWORD). Message received in simulated sandbox mode."
      );
      return NextResponse.json({
        status: "success",
        message:
          "Message validated successfully! (Server running in sandbox mode; configure SMTP_EMAIL and SMTP_PASSWORD in .env for live dispatch).",
      });
    }

    // Nodemailer transporter
    const cleanEmail = smtpEmail.trim();
    const cleanPassword = smtpPassword.trim().replace(/\s+/g, "");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: cleanEmail,
        pass: cleanPassword,
      },
    });

    if (isOffer) {
      await transporter.sendMail({
        from: `"${hrEmail}" <${smtpEmail}>`,
        to: recipientEmail,
        replyTo: hrEmail,
        subject: "🎉 HURRAY! You received an Offer Letter!",
        html: `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #10b981;">Congratulations Prabhu!</h2>
            <p>A recruiter has submitted an offer letter via your portfolio website dropzone.</p>
            <p><strong>HR Email:</strong> <a href="mailto:${hrEmail}">${hrEmail}</a></p>
            <p>Please review the attached document.</p>
          </div>
        `,
        attachments: fileBuffer
          ? [
              {
                filename: fileName || "offer-letter.pdf",
                content: fileBuffer,
              },
            ]
          : [],
      });
    } else {
      await transporter.sendMail({
        from: `"${name}" <${smtpEmail}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Portfolio Message: ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #0284c7;">New Message from Portfolio Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      status: "success",
      message: isOffer
        ? "Offer Letter sent successfully! I will review it immediately."
        : "Message sent successfully! Thank you for reaching out.",
    });
  } catch (error: any) {
    console.error("[API/CONTACT Error]:", error);
    let errorMsg = error.message || "Failed to process request.";
    if (
      errorMsg.includes("535") ||
      errorMsg.includes("BadCredentials") ||
      errorMsg.includes("Username and Password not accepted")
    ) {
      errorMsg =
        "Google SMTP Auth Failed (535 BadCredentials): Gmail App Password was not accepted. Please verify 2-Step Verification is active, generate a fresh 16-character App Password at myaccount.google.com/apppasswords, and update SMTP_PASSWORD in .env.";
    }
    return NextResponse.json(
      { status: "error", message: errorMsg },
      { status: 500 }
    );
  }
}
