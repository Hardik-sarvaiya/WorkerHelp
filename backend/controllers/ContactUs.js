const { mailSender } = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNo, countrycode, message } = req.body;

    // Log the incoming data
    console.log("📩 Received contact form:", req.body);

    // Create email body
    const html = `
      <h2>📬 New Contact Form Submission</h2>
      <p><b>Name:</b> ${firstname} ${lastname}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${countrycode} ${phoneNo}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    // Send email to admin
    await mailSender("yourgmail@gmail.com", "New Contact Form Message", html);

    console.log("✅ Contact form email sent");
    return res.status(200).json({ status: "OK", message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return res.status(500).json({ status: "FAIL", message: "Could not send email" });
  }
};
