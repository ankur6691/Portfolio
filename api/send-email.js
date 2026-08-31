import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.MY_EMAIL}>`,
      replyTo: email,
      to: process.env.MY_EMAIL,
      subject: `🚀 Portfolio Dispatch from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #080a14; color: #ffffff; border-radius: 12px;">
          <h2 style="color: #38bdf8; margin-top: 0;">✦ New Portfolio Message</h2>
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #c084fc;">${email}</a></p>
          <div style="background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 3px solid #38bdf8; margin-top: 15px;">
            <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ success: false, message: "Error sending email" });
  }
}