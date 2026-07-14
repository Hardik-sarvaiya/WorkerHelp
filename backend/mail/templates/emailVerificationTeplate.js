


const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WorkerHelp - OTP Verification</title>
  <style>
    body {
      background-color: #f6f9fc;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      padding: 40px 30px;
      text-align: center;
    }

    .logo {
      max-width: 160px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 22px;
      font-weight: 600;
      color: #0078ff;
      margin-bottom: 20px;
    }

    .body {
      text-align: left;
      color: #444;
    }

    .body p {
      margin: 12px 0;
    }

    .otp-box {
      background-color: #f0f7ff;
      border: 2px dashed #0078ff;
      border-radius: 8px;
      display: inline-block;
      padding: 15px 30px;
      margin: 20px 0;
    }

    .otp-box h2 {
      font-size: 32px;
      letter-spacing: 4px;
      color: #0078ff;
      margin: 0;
    }

    .support {
      font-size: 14px;
      color: #777;
      margin-top: 25px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }

    .support a {
      color: #0078ff;
      text-decoration: none;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 25px 20px;
      }

      .message {
        font-size: 20px;
      }

      .otp-box h2 {
        font-size: 26px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Add your logo if needed -->
    <!-- <img src="https://your-logo-url.png" alt="WorkerHelp Logo" class="logo" /> -->

    <div class="message">OTP Verification Email</div>

    <div class="body">
      <p>Dear User,</p>
      <p>Thank you for registering with <strong>WorkerHelp</strong>. To complete your registration, please use the One-Time Password below to verify your account:</p>

      <div class="otp-box">
        <h2>${otp}</h2>
      </div>

      <p>This OTP is valid for <strong>5 minutes</strong>. If you did not request this verification, please ignore this email.</p>
      <p>Once your account is verified, you will have access to our platform and its full features.</p>
    </div>

    <div class="support">
      Need help? Reach us at 
      <a href="mailto:info@workerhelp.com">info@workerhelp.com</a> — we’re happy to assist you.
    </div>
  </div>
</body>
</html>`;
};

module.exports = otpTemplate;
