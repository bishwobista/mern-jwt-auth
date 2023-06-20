const nodemailer = require("nodemailer");

module.exports = async (data, mailType) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: " bishwo5biata@gmail.com",
        pass: "test", //app password
      },
    });
    const mailOptions = {
        from: "bishwo5bista@gmail.com",
        to: data.email,
        subject: "Account Verification",
        content: `Hi ${data.name}, Your account has been ${mailType} successfully`,
        html: `<h1>Hi ${data.name}</h1>
        <p>Your account has been ${mailType} successfully</p>`,
        };
        
  } catch (error) {
    console.log(error);
  }
};
