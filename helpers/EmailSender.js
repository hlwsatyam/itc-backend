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
        subject: "🌟 Welcome to ITC Franchisee Opportunity 🌟",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
            <h2 style="color: #ffffff; text-align: center;">🌟 Welcome to ITC 🌟</h2>
            <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
            <p>We are delighted to welcome you to ITC, an innovative marketplace offering a vast range of <strong>Personal Care, Healthcare, Beauty Care, Herbal,</strong> and <strong>Organic</strong> products across India. 🛍 Our commitment to delivering genuine products at competitive prices has earned us remarkable appreciation from our business partners. 🚀</p>
  
            <h3 style="color: #ffffff;">About ITC Ltd.</h3>
            <p>ITC is one of India's leading private sector companies, achieving Gross Sales of ₹69,481 crores and a Net Profit of ₹28,753.31 crores as of March 31, 2024. 🏢 Our business spans <strong>FMCG, Hotels, Packaging, Paperboards & Specialty Papers,</strong> and <strong>Agri-Business</strong>. ITC is globally recognized 🌍 for its sustainability practices, being the only company of its scale that is carbon, water, and solid waste recycling positive. 🌿 Our value chains support sustainable livelihoods for over 6 million people, especially in rural areas. 🌾</p>
  
            <h3 style="color: #ffffff;">Company's Role:</h3>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li>🏬 Distributorship for Home Care, Personal Care, Food & Refreshment, Stationery, and Cigarettes.</li>
              <li>💼 Required Investment: ₹2,00,000 to ₹10,00,000.</li>
              <li>🎯 Offering a 30%-35% discount on ITC products.</li>
              <li>🔄 Replacement of expired or damaged products.</li>
              <li>🚚 Product delivery to the registered address.</li>
              <li>🛠 Assistance in designing and setting up the store's interior.</li>
              <li>💡 Contribution of 50% towards rent and electricity bills.</li>
              <li>📦 Supply of products and equipment.</li>
              <li>👨‍💼 Payment of staff salaries.</li>
              <li>📑 Provision of SOPs, training, and manuals.</li>
              <li>💻 Billing software for smooth operations.</li>
              <li>📣 Brand-level marketing through digital/social media, TV, radio, hoardings, etc.</li>
            </ul>
  
            <h3 style="color: #ffffff;">Distributor's Role:</h3>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li>🏢 Maintain a store size between 200 and 1000 sq. ft.</li>
              <li>😀 Ensure high customer satisfaction.</li>
              <li>🛠 Report issues and take corrective actions as required.</li>
              <li>🗓 Notify ITC 15 days prior to product expiry.</li>
              <li>❌ Never sell products above MRP.</li>
              <li>📨 Place orders via official email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></li>
            </ul>
  
            <h3 style="color: #ffffff;">Required Documents:</h3>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li>🆔 PAN Card</li>
              <li>🆔 Aadhar Card</li>
              <li>📜 Educational Certificate</li>
              <li>🖼 Passport Size Photo</li>
              <li>🗂 ITR File & GST Paper</li>
              <li>📄 ITC Application Form (Attached)</li>
              <li>🏦 1 Year Bank Statement</li>
              <li>🏠 Address Proof of Business/Store/Shop/Godown</li>
            </ul>
            <p>Please send all the necessary documents to: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a> 📧</p>

            <p>Best regards,</p>

            <p><strong style="color: #ffffff;">Sourabh Goel</strong><br>ITC Franchisee Development Team
            <br>
           📍 Virginia House, 37, J.L. Nehru Road, Kolkata - 700071, India
           <br>
            Email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></p>
          </div>
        </div>
        `,
        attachments: [
          {
            filename: "ITC Franchisee Partner Application Form.pdf",
            path: "./ITC registration form (4)_compressed.pdf",
          },
          {
            filename: "ITC Price List.pdf",
            path: "./ITC price list.pdf",
          },
          {
            filename: "Product Brochure.pdf",
            path: "./ITC products price list new .pdf",
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
  sharePostOfficeEmail: async (recipientEmail, selectedPostOffices, leadName) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {

      let mailOptions = {
        from: "contactus@itcportals.com",
        to: recipientEmail, // Recipient address
        subject: 'Welcome to ITC Limited – Franchisee Opportunity Details',
        html: `
          <html>
          <head>
            <style>
              body {
                font-family: ui-monospace;
                background-color: #f9f9f9;
                color: #333333;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                padding: 20px;
                background-color: #ffffff;
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #004d40;
                color: #ffffff;
                padding: 10px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 20px;
                line-height: 1.6;
              }
              .content h2 {
                color: #004d40;
              }
              .content ul {
                list-style-type: disc;
                padding-left: 20px;
              }
              .content li {
                margin-bottom: 10px;
              }
              .footer {
                background-color: #004d40;
                color: #ffffff;
                text-align: center;
                padding: 5px;
                margin-top: 20px;
              }
              .button {
                background-color: #ff5722;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin-top: 20px;
              }
              .button:hover {
                background-color: #e64a19;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to ITC Limited</h1>
                <p>Franchisee Opportunity Details</p>
              </div>
              <div class="content">
                <p>Dear ${leadName},</p>
                <p>
                  I hope this email finds you well. I’m Saurav Goel from the ITC Franchisee Development Team, and I’d like to provide you with more information regarding the ITC Limited franchise/distributorship opportunity.
                </p>
    
                <h2>About ITC Limited:</h2>
                <p>ITC Limited is one of India’s leading companies, operating in multiple sectors. We do business in the following areas:</p>
                <ul>
                  <li><strong>Foods:</strong> Aashirvaad, Sunfeast, Bingo!, Kitchens of India, Sunfeast Yippee, B Natural, and many more popular brands.</li>
                  <li><strong>Personal Care:</strong> EDW Essenza, Dermafique, Fiama, Vivel, Engage, and Savlon.</li>
                  <li><strong>Education:</strong> Classmate and Paperkraft.</li>
                  <li><strong>Matches & Agarbatti:</strong> AIM, Mangaldeep, and Dazzle.</li>
                  <li><strong>Cigarettes:</strong> Insignia, Gold Flake, and Wills Navy Cut.</li>
                </ul>
     <p>You might have heard about these brands, which are known for their trustworthiness and popularity </p>
                <h2>Benefits of Becoming an ITC Franchisee:</h2>
        <p>By becoming an ITC franchisee, you will enjoy the following benefits:</p>         
                <ul>
                  <li>Monopoly Business Opportunity: If you become an ITC franchisee in the locations listed below, you will be the exclusive seller of ITC products in that area, ensuring complete monopoly over ITC product sales in your region.</li>
                  <li>Guaranteed Sales: We assure you that the monthly sales in these locations are approximately ₹32 lakh. This ensures that your fixed monthly income will be around ₹2.4 lakh to ₹3.2 lakh, making it a very profitable venture.</li>
                  <li>No Target Pressure: In this franchise model, there is no sales target pressure, and you will not be forced to order products that don’t sell well in your region. Your orders can be tailored to suit your market needs.</li>
                  <li>Refundable Fees: Both the franchise fee and agreement fee are fully refundable in case of cancellation, providing financial security to you.</li>
                  <li>Credit Limit and Interest: ITC provides a 90-day credit limit with no interest. After the 90 days, an interest of 12% per annum will be applicable for any unpaid amount beyond the credit period</li>
                  <li>Support with Marketing and Staffing: The company will provide you with two trained marketing personnel to help develop your franchise. Their salaries will be covered by ITC Limited, so you don’t have to bear this cost.</li>

                  <li>Godown Rent Subsidy: ITC will cover the rent for your godown at the rate of ₹20 per square foot, making it easier for you to manage operational costs. </li>
              <li>Franchise Cancellation Notice Period: The franchise cancellation notice period is 15 days, and payment settlement will be completed within 30 days after cancellation.
              </li>

<li>Brand Recognition: ITC is a well-known brand, which will give your business a strong presence in the market.
</li>
<li>Support and Training: We provide comprehensive training and ongoing support to ensure the successful operation of your franchise.
</li>

<li>Marketing and Promotional Support: You will benefit from our marketing strategies and promotional activities to grow your business.
</li>

<li>Operational Guidance: We will assist you with operations, inventory management, and other business aspects.
</li>

<li>Profit Margin: The profit margin on ITC products ranges between 5% to 10%.
</li>
<li>Outlet Development: ITC will help develop your outlet and provide amenities such as CCTV cameras, interior and exterior furnishings, and trained staff (whose salaries will be covered by ITC).
</li>

                  </ul>
    
<h2>Process to Become an ITC Franchisee:
</h2>
<ul>
<li><strong>Step 1:
</strong> Firstly, share the filled franchisee application form along with all the mandatory KYC documents. These include your Aadhaar card, PAN card, bank statements, and other relevant documents as required.
 </li>
<li><strong>Step 2:
</strong> Our Franchisee Development Team will review your application and get approval within 24 hours. You can then check your approval status on the ITC customer portal and pay the franchise fee of ₹42,500 (forty-two thousand five hundred rupees), which is fully refundable.

 </li>
<li><strong>Step 3:

</strong>Once the agreement is completed, it will be uploaded on the ITC customer portal. You can check your status on the portal and pay the agreement fee of ₹1,67,432 (one lakh sixty-seven thousand four hundred thirty-two rupees), which is also fully refundable.
 </li>
 <li>
 <strong>Step 4:
</strong>After the agreement is done, simply submit your purchase order and pay the security deposit based on your order value. Once your order is placed, you can continue selling ITC products in your preferred location.
 </li>

</ul>


                <h2>Investment and Documents:</h2>
                <p>To become a franchisee, the following investments and documents are required:</p>
                <ul>
                  <li>Franchise Fee: ₹42,500</li>
                  <li>Agreement Fee: ₹1,67,423</li>
                  
                  <li>90 Days Credit Limit: ITC provides a 90-day credit limit with no interest.</li>
                </ul>
    
                <h2>Required Documents:</h2>
                <ul>
                  <li>Aadhaar Card (front and back)</li>
                  <li>PAN Card</li>
                  <li>Bank Statement (last 6 months)</li>
                  <li>Recent Self-Photograph</li>
                  <li>Property-related Documents</li>
                </ul>
                <h2>Optional Documents (if applicable):</h2>
                <ul>
                  <li>Last 2 years' ITR</li>
                  <li>FSSAI License</li>
                  <li>GST Certificate</li>    
                </ul>
                <h2>Space Required:</h2>
                <ul>
                  <li>Office: 150 to 200 Square Feet</li>
                  <li>Godown: 1500 to 2000 Square Feet</li>
                  <li>Other Space: 200 to 400 Square Feet</li>
                 
                </ul>
    
                <h2>Preferred or Available Locations:</h2>
                <p>We are currently seeking franchisees in the following locations on an urgent basis. If you become a franchisee here, you will have exclusive rights to sell ITC products, making this a complete monopoly business in these areas:</p>
             
  <ul>
    ${selectedPostOffices?.map((e, index) => `<li key="${index}">${e.Name},${e.District},${e.State} ${e.Pincode}, ${e.Country}</li>`).join('')}
  </ul>
  <h2>Application Process:</h2>

    
                <p>Attached to this email, you will find the ITC franchisee application form, product price list, and other relevant documents. Kindly print and fill out the application form, attach the necessary documents, and reply to this email with your completed form and attachments.</p>
    

<h2>Important Note:</h2>

<ul>
<li>
Please make any payments only to the official ITC Limited account.

</li>
<li>
•	This is a very urgent requirement, and if you're interested, kindly share your filled franchisee application form along with all KYC documents to this same email address.
</li>

</ul>


                <h2>FAQ:</h2>
                <ul>
                  <li><strong>Office Location:</strong> Our office is located at Virginia House, 37, J.L. Nehru Road, Kolkata - 700071, India.</li>
                  <li><strong>Verification of ITC Affiliation:</strong> I will send you an email through the ITC portal from our official email ID: contactus@itcportals.com.</li>
                  <li><strong>Position:</strong> I am Saurav Goel from the ITC Franchisee Development Team, working as the Marketing Head.</li>
                  <li><strong>Office Visit:</strong> I can arrange an appointment with our Sales Head. Kindly let me know a suitable meeting time.</li>

                  <li> <strong>Office Visit:</strong> I can arrange an appointment with our Sales Head. Kindly let me know a suitable meeting time.  </li>

                </ul>
    
                <p>Thank you for your interest in partnering with ITC Limited. If you have any further questions or need assistance with the application process, feel free to reply to this email.</p>
    
                <p><a href="tel:+917209058182" class="button">Call Now</a></p>
    
              </div>
              <div class="footer">
                <p>Best regards,</p>
                <p>Saurav Goel</p>
                <p>ITC Franchisee Development Team</p>
                <p>Email: contactus@itcportals.com | Phone: 7209058182</p>
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: "ITC Franchisee Partner Application Form.pdf",
            path: "./ITC registration form (4)_compressed.pdf",
          },
          {
            filename: "ITC Price List.pdf",
            path: "./ITC products price list new (1) (1) (1).pdf",
          },
          {
            filename: "Product Brochure.pdf",
            path: "./ITC  TOBACCO PRODUCT PRICE LIST 2024 (1)_compressed.pdf",
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

  cancelEmail: async (email, phone, name) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "ITC Franchisee Agreement Cancellation and Refund",
        html: ` 
          <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
              <h2 style="color: #ffffff;">ITC Franchisee Agreement Cancellation and Refund</h2>
              <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
              <p>I hope this message finds you well.</p>
              <p    >We regret to inform you that your ITC franchisee agreement has been canceled. We apologize for any inconvenience this may cause.</p>
              <p>Please be assured that all amounts paid will be refunded to your account. The refund process will be completed within 90 days.</p>
              <p>Should you have any questions or require further assistance, please feel free to contact us.</p>
              <p>Thank you for your understanding.</p>
              <p>Best regards,</p>
              <p><strong style="color: #ffffff;">ITC Franchisee Team</strong><br>
              Email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, verificationCode };
  },
  aproovalEmail: async (email, name, loginId, password, statusUrl) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "ITC Franchisee Approval - Check Status Now",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
            <h2 style="color: #ffffff;">ITC Franchisee Approval - Check Status Now</h2>
            <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
            <p>We are pleased to inform you that your application for an ITC franchisee has been approved! We welcome you to the ITC family and look forward to a successful partnership.</p>

            <p>To check the status of your franchisee application and access your account, please use the following credentials:</p>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li><strong>Login ID:</strong> ${loginId}</li>
              <li><strong>Password:</strong> ${password}</li>
            </ul>

            <p>Click on the following URL to check your status: <a href="${statusUrl}" style="color: #ffffff;">${statusUrl}</a></p>

            <p>If you have any questions or concerns, please don't hesitate to reach out to us. We are always here to help.</p>

            <p>Congratulations once again on your approval!</p>

            <p>Best regards,</p>
            <p><strong style="color: #ffffff;">ITC Franchisee Team</strong></p>
            <p>Email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></p>
          </div>
        </div>
      `,
      };

      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, verificationCode };
  },
  agreementEmail: async (email, name, loginId, password, statusUrl) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "ITC Franchisee Agreement Approved - Status Check Information",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
            <h2 style="color: #ffffff;">ITC Franchisee Agreement Approved - Status Check Information</h2>
            <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
            <p>I am pleased to inform you that your ITC franchisee agreement has been approved.</p>
            <p>To check the status and access further details, please use the following link: <a href="${statusUrl}" style="color: #ffffff;">${statusUrl}</a>. You will need to log in with the credentials provided below:</p>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li><strong>User ID:</strong> ${loginId}</li>
              <li><strong>Password:</strong> ${password}</li>
            </ul>
            <p>If you encounter any issues or require additional information, please do not hesitate to contact us.</p>
            <p>Thank you for your cooperation.</p>
            <p>Best regards,</p>
            <p><strong style="color: #ffffff;">ITC Franchisee Team</strong></p>
            <p>Email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></p>
          </div>
        </div>
      `,
      };
      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, verificationCode };
  },
  bankDetailShareEmail: async (
    email,
    name,
    accountNumber,
    bankName,
    branchName,
    ifscCode
  ) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "ITC Limited Account Details and Payment Instructions",
        html: `
          <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
              <h2 style="color: #ffffff;">ITC Limited Account Details and Payment Instructions</h2>
              <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
              <p>I hope this email finds you in good health and high spirits.</p>
              <p>As part of our ongoing efforts to facilitate smooth and efficient transactions, I am providing you with the account details for ITC Limited, as requested. Please review the following information carefully:</p>
              <ul style="margin-left: 20px; color: #a19adb;">
                <li><strong>Account Name:</strong> ITC Limited</li>
                <li><strong>Account Number:</strong> ${accountNumber}</li>
                <li><strong>Bank Name:</strong> ${bankName}</li>
                <li><strong>Branch:</strong> ${branchName}</li>
                <li><strong>IFSC Code:</strong> ${ifscCode}</li>
              </ul>
              <p>Before making any payments, I kindly request that you contact our Franchisee Development Team. It is crucial to ensure that all details related to your payment are accurately confirmed and that any specific requirements or arrangements are addressed. The Franchisee Development Team is well-equipped to assist you with any queries you may have regarding the payment process, as well as to provide guidance on how to proceed effectively.</p>
              <p>Here are a few reasons why contacting the Franchisee Development Team beforehand is beneficial:</p>
              <ul style="margin-left: 20px; color: #a19adb;">
                <li><strong>Verification of Details:</strong> The team will confirm that the payment details provided are current and accurate, reducing the risk of errors or miscommunications.</li>
                <li><strong>Clarification of Payment Terms:</strong> Any specific terms or conditions related to your payment can be discussed in detail. This ensures that you are fully informed and can comply with any requirements set forth by ITC Limited.</li>
                <li><strong>Assistance with Payment Process:</strong> Should you encounter any issues or have questions about the payment process, the team is available to offer support and resolve any potential challenges promptly.</li>
                <li><strong>Customized Guidance:</strong> If there are any particular nuances to your payment or if you have special instructions, the Franchisee Development Team can provide personalized assistance to ensure everything is handled efficiently.</li>
              </ul>
              <p>We highly value your partnership and aim to make every aspect of our collaboration as smooth as possible. By coordinating with the Franchisee Development Team before proceeding with your payment, you help us maintain the highest standards of service and accuracy in our transactions.</p>
              <p>If you need further information or if there are any additional questions or concerns you would like to address, please do not hesitate to reach out to me directly. I am here to assist you and ensure that all aspects of our engagement are handled to your satisfaction.</p>
              <p>Thank you very much for your attention to this matter. We look forward to continuing our successful partnership and appreciate your cooperation.</p>
              <p>Best regards,</p>
              <p><strong style="color: #ffffff;">ITC Franchisee Team</strong></p>
              <p>Email: <a href="mailto:contactus@itcportals.com" style="color: #a19adb;">contactus@itcportals.com</a></p>
            </div>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);
      isEmailsends = true;
    } catch (error) {
      console.log(error);
      isEmailsends = false;
    }
    return { isEmailsends, verificationCode };
  },
  POEmail: async (email, name, loginId, password, statusUrl) => {
    let isEmailsends = false;
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      const mailOptions = {
        from: "contactus@itcportals.com",
        to: email,
        subject: "ITC Franchisee Purchase Order Request",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #576de6; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff;">
            <h2 style="color: #ffffff;">ITC Franchisee Purchase Order Request</h2>
            <p>Dear <strong style="color: #ffffff;">${name}</strong>,</p>
            <p>I hope this email finds you well.</p>
            <p>We would like to request a purchase order for our ITC franchisee operations. Please process this request at your earliest convenience.</p>
            <p>To check the status of the purchase order, you can use the following link: <a href="${statusUrl}" style="color: #ffffff;">${statusUrl}</a>. Please log in using the credentials provided below:</p>
            <ul style="margin-left: 20px; color: #ffffff;">
              <li><strong>User ID:</strong> ${loginId}</li>
              <li><strong>Password:</strong> ${password}</li>
            </ul>
            <p>Should you need any additional information or have any questions, please feel free to contact us.</p>
            <p>Thank you for your prompt attention to this matter.</p>
            <p>Best regards,</p>
            <p><strong style="color: #ffffff;">ITC Franchisee Team</strong></p>
            <p>Email: <a href="mailto:contactus@itcportals.com" style="color: #ffffff;">contactus@itcportals.com</a></p>
          </div>
        </div>
      `,
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
