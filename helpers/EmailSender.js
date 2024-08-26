const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "satyampandit021@gmail.com",
//     pass: "mnlm kfcp wzwb dthw",
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // SMTP server for Hostinger
  port: 465, // SSL port for secure communication
  secure: true, // true for 465, false for other ports
  auth: {
    user: "contactus@itcportals.com", // Your Hostinger webmail email address
    pass: "Sanjay@9523", // Your Hostinger webmail password
  },
});

const emailSender = {
  welcomeEmail: async (email, phone, name) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "Welcome to ITC Franchisee Opportunity",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px;"> 
          <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
            <h2 style="color: #ffffff;">Welcome to ITC Franchisee Opportunity</h2>
            <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
            <p>We are delighted to welcome you to the ITC Franchisee Opportunity and explore the possibility of you joining our network. Our team is committed to supporting you throughout this journey and helping you achieve your business objectives.</p>
            
            <p>To proceed, please find attached the franchisee application form. We request that you:</p>
            <ul style="margin-left: 20px;">
              <li>Print and complete the form in its entirety</li>
              <li>Sign the form</li>
              <li>Scan and return it to us via email</li>
            </ul>
            
            <p>Please ensure that the form is fully completed and signed before submission. Additionally, kindly attach the required supporting documents:</p>
            <ul style="margin-left: 20px;">
              <li>Aadhaar card (front and back)</li>
              <li>PAN card</li>
              <li>Bank statement (last 6 months)</li>
              <li>Recent self-photograph</li>
              <li>Property-related documents</li>
            </ul>
            
            <p>Optional documents (if applicable):</p>
            <ul style="margin-left: 20px;">
              <li>Last 2 years' ITR</li>
              <li>FSSAI license</li>
              <li>GST certificate</li>
            </ul>
            
            <p>We look forward to receiving your application and exploring this opportunity further.</p>
            
            <p>Best regards,</p>
            <p><strong style="color: #ffffff;">Sourabh Goel</strong><br>ITC Franchisee Development Team<br>
            Email: <a href="mailto:contactus@itcportals.com" style="color: #a19adb;">contactus@itcportals.com</a></p>
          </div>
        </div>
      `,

        attachments: [
          {
            filename: "Itc Franchisee Partner Application Form.pdf", // Replace with your first PDF file name
            path: "./ITC.pdf", // Replace with the actual file path
          },
          {
            filename: "ITC price list.pdf", // Replace with your first PDF file name
            path: "./ITC price list.pdf", // Replace with the actual file path
          },
          {
            filename: "Prodict broucher.pdf", // Replace with your first PDF file name
            path: "./prodict broucher.pdf", // Replace with the actual file path
          },
        ],
      };
    
      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, verificationCode };
  },
};

module.exports = emailSender;
