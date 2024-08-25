const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satyampandit021@gmail.com",
    pass: "mnlm kfcp wzwb dthw",
  },
});

const emailSender = {
  welcomeEmail: async (email, phone) => {
    let isEmailsends = false;
    let varificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "satyampandit021@gmail.com",
        to: email,
        subject: "Welcome Message",
        html: `<p> Thanks For Contact Us,Your Login Id is ${phone} & code is: <strong>${varificationCode}</strong></p>`,
      };
      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, varificationCode };
  },
};
module.exports = emailSender;
