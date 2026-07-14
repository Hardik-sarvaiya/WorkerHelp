exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Updated Successfully</title>
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

    .message {
      font-size: 24px;
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

    .highlight {
      color: #0078ff;
      font-weight: 600;
    }

    .info-box {
      background-color: #f0f7ff;
      border-left: 5px solid #0078ff;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 8px;
      text-align: left;
    }

    .info-box strong {
      color: #0078ff;
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
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Optional: Add your logo -->
    <!-- <img src="https://your-logo-url.png" alt="WorkerHelp Logo" class="logo" /> -->

    <div class="message">Password Updated Successfully</div>

    <div class="body">
      <p>Hey <strong>${name}</strong>,</p>
      <div class="info-box">
        <p>Your password has been successfully updated for the account associated with <strong class="highlight">${email}</strong>.</p>
      </div>
      <p>If you did not make this change, please <strong>contact our support team immediately</strong> to secure your account.</p>
      <p>We recommend regularly updating your password to keep your WorkerHelp account safe and secure.</p>
    </div>

    <div class="support">
      Need help? Reach us anytime at 
      <a href="mailto:info@workerhelp.com">info@workerhelp.com</a> — we’re always here to assist you.
    </div>
  </div>
</body>
</html>`;
};
