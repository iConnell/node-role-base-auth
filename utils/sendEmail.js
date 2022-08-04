const nodemailer = require("nodemailer");

const tranporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: process.env.ELASTIC_USER,
    pass: process.env.ELASTIC_API_KEY,
  },
});

const sendPasswordResetMail = async (email, passwordResetToken) => {
  await tranporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `
      <div>
        <h3>Hi! You cannot seem to remember your password.</h3>
        <h4>Don"t worry, we've got you covered</h4>
        <h4>Click the link below to reset your password</h4>
        <a href="http:127.0.0.1:8000/auth/reset-password/${passwordResetToken}">Reset Password</a>
      </div>
    `,
  });
};

module.exports = sendPasswordResetMail;
