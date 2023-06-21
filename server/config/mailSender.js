const nodemailer = require("nodemailer");

module.exports = async (data, mailType) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.APP_EMAIL, // email
        pass: process.env.APP_PASS, //app password
      },
    });
    const mailOptions = {
      from: "bishwo5bista@gmail.com",
      to: data.email,
      subject: "Account Verification",
      html: `<h1>Hi ${data.name}</h1>
        <p>Your account has been ${mailType} successfully</p>`,
    };
  } catch (error) {
    console.log(error);
  }
};
