import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "noreply@monapp.com",
      to,
      subject,
      text,
    });

    console.log("📩 Email sending successfully :", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email :", error);
  }
};

export default sendEmail;
