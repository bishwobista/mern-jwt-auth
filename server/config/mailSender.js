const nodemailer = require("nodemailer");
require("dotenv").config();
const Token = require("../models/tokenModel");
const bycrypt = require("bcryptjs");

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

    const verifyToken = await bycrypt.hash(data._id.toString(), 10);
    verifyToken = verifyToken.replaceAll("/", "");
    const token = new Token({
      userid: data._id,
      token: verifyToken,
    });
    await token.save()
    const content = `<h1>Please click on the link below to verify your account</h1>
    <a href="http://localhost:3000/verify/${verifyToken}">Verify Account</a>`
    const mailOptions = {
      from: process.env.APP_EMAIL, // use the configured email address
      to: data.email,
      subject: "Account Verification",
      html: content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error occurred while sending email:", error);
  }
};
