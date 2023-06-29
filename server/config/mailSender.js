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
    const verifyToken = await bcrypt.hashSync(data._id.toString(), 10).replaceAll('/', '')
        const token = new Token({ userid: data._id, token: verifyToken })
        await token.save()
        const content = `<div><h1>Please verify your mail by clicking this link</h1></br><a href="http://localhost:5173/verify/${verifyToken}/">Click this token</a></div>`

    const mailOptions = {
      from: "bishwo5bista@gmail.com",
      to: data.email,
      subject: "Verify your mail for JWT App",
      html: content,
    };

    const info = await mailConfig.sendMail(mailOptions);
    // console.log("Email sent:", info.response);
  } catch (error) {
    console.log(error);
  }
};
