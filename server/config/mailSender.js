const nodemailer = require("nodemailer");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");

module.exports = async (data, mailType) => {
  try {
    const mailConfig = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL, // email
        pass: process.env.APP_PASSWORD, // Google App Passwordm
      },
    });

    // Mail Verification
    const verifyToken = await bcrypt
      .hashSync(data._id.toString(), 10)
      .replaceAll("/", "");
    const token = new Token({ userid: data._id, token: verifyToken });
    await token.save();
    const content = `<h1>Please click on the link below to verify your account</h1>
             <a href="http://localhost:3000/verify/${verifyToken}">Verify Account</a>`;

    const mailOptions = {
      from: "bishwo5bista@gmail.com",
      to: data.email,
      subject: "Verify your mail for JWT App",
      html: content,
    };

    const info = await mailConfig.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log(error);
  }
};
