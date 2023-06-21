const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (data, mailType) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.APP_EMAIL, // email
        pass: process.env.APP_PASSWORD, // Google App Password
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL, // use the configured email address
      to: data.email,
      subject: "Account Verification",
      html: `<h1>Hi ${data.name}</h1>
        <p>Your account has been ${mailType} successfully</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error occurred while sending email:", error);
  }
};
