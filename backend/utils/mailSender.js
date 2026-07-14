
const nodemailer = require("nodemailer");
const otpTemplate = require("../mail/templates/emailVerificationTeplate");

const mailSender = async (email, title, otp) => {
  try {
    //Generate HTML body from template
    const body = otpTemplate(otp);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // or 465 if using SSL
      secure: false, // true for 465, false for others
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //  Send email
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM, // e.g. "WorkerHelp <noreply@workerhelp.com>"
      // to: email,
      // subject: title,
      // html: body,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("✅ Mail sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mail sending error:", error.message);
  }
};

module.exports = mailSender;
