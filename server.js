const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const emailSender = require("./helpers/EmailSender");
// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

mongoose
  .connect(
    "mongodb+srv://satyampandit021:20172522@rvbmhotelbooking.9hfzkrx.mongodb.net/itc?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

const formSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  approval: {
    // Fixed spelling from "aprooval" to "approval"
    type: Boolean,
    default: false,
  },
  approvalDate: String,
  email: String,
  address: String,
  area: String,
  pincode: String,
  disctict: String,
  state: String,
  postOffice: String,
});

const Form = mongoose.model("Form", formSchema);

const BankDetailSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  holderName: { type: String, required: true },
});

const BankDetail = mongoose.model("BankDetail", BankDetailSchema);

app.use("/static", express.static(path.join(__dirname, "public")));

// app.get("/api/approval-letter", async (req, res) => {
//   try {
//     const { mobile } = req.query;

//     // Fetch user details from database
//     const user = await Form.findOne({ mobile: mobile });
//     const bankDetails = await BankDetail.findOne();

//     if (!user || !user.approval) {
//       return res.status(404).json({ error: "Approval letter not found" });
//     }

//     const doc = new PDFDocument({
//       margins: { top: 50, bottom: 50, left: 72, right: 72 },
//       size: "A4",
//       info: {
//         Title: "Approval Letter",
//         Author: "ITC Franchisee Development Team",
//       },
//     });

//     res.setHeader(
//       "Content-Disposition",
//       'attachment; filename="approval-letter.pdf"'
//     );
//     res.setHeader("Content-Type", "application/pdf");

//     doc.pipe(res);

//     // Header
//     doc
//       .fontSize(25)
//       .font("Helvetica-Bold")
//       .fillColor("#1a1a1a")
//       .text("Approval Letter", { align: "center" })
//       .moveDown(2);

//     // Date and Recipient Info
//     doc
//       .fontSize(12)
//       .fillColor("#000")
//       .font("Helvetica")
//       .text(`Date:  ${user?.approvalDate} `)
//       .moveDown();

//     doc.text(`To:`, { continued: true }).font("Helvetica-Bold").text(user.name);
//     doc
//       .font("Helvetica")
//       .text(`Address: ${user?.address}`)
//       .text(`State: ${user?.state}`)
//       .text(`Pincode: ${user.pincode}`)
//       .text(`Post Office: ${user.postOffice}`)
//       .moveDown(2);

//     // Body
//     doc
//       .fontSize(12)
//       .text(
//         `Dear ${user.name},\n\nWe are pleased to inform you that your application for an ITC Franchisee has been approved. We welcome you to the ITC family and congratulate you on taking the first step towards a successful business venture.`,
//         { lineGap: 5 }
//       )
//       .moveDown(2);

//     doc
//       .font("Helvetica-Bold")
//       .text("Below are the details of your franchisee approval:", {
//         underline: true,
//       })
//       .moveDown();

//     doc
//       .font("Helvetica")
//       .list([
//         `Franchisee Name: ${user.name}`,
//         `Franchisee Code: ${user._id} `,
//         `Product Categories: ITC`,
//         `Term: 10 Years`,
//         `Renewal Terms: ₹42,500 `,
//       ])
//       .moveDown(2);

//     doc
//       .font("Helvetica-Bold")
//       .text(
//         "Please note that this approval is subject to the following conditions:"
//       )
//       .moveDown();

//     doc
//       .font("Helvetica")
//       .list([
//         `Execution of the Franchisee Agreement within 3 days from the date of this letter.`,
//         `Payment of the Franchisee fee of ₹42,500 and other applicable charges.`,
//         `Completion of the training program conducted by ITC.`,
//       ])
//       .moveDown(2);

//     doc
//       .text(
//         `We request you to sign and return one copy of this letter to us within 48 hours from the date of receipt, indicating your acceptance of the terms and conditions.`,
//         { lineGap: 5 }
//       )
//       .moveDown(2);

//     doc
//       .font("Helvetica-Bold")
//       .text("Bank Details for Franchisee Fee Payment:", {
//         underline: true,
//       })
//       .moveDown();

//     doc
//       .font("Helvetica")
//       .list([
//         `Account Number: ${bankDetails.accountNumber}`,
//         `IFSC Code: ${bankDetails.ifscCode}`,
//         `Bank Name: ${bankDetails.bankName}`,
//         `Account Holder Name: ${bankDetails.holderName}`,
//       ])
//       .moveDown(2);

//     doc
//       .text(
//         `Please note that this payment will be adjusted against your future purchase orders. We appreciate your prompt attention to this matter and look forward to a successful partnership.`,
//         { lineGap: 5 }
//       )
//       .moveDown(2);

//     doc
//       .text(
//         `Congratulations once again on becoming an ITC Franchisee! We look forward to a successful partnership.`,
//         { lineGap: 5 }
//       )
//       .moveDown(2);

//     // Footer
//     doc
//       .fontSize(12)
//       .text("Best Regards,", { lineGap: 5 })
//       .moveDown()
//       .font("Helvetica-Bold")
//       .text("Sourav Goel")
//       .font("Helvetica")
//       .text("ITC Franchisee Development Team")
//       .text("Email: contactus@itcportals.com");

//     doc.end();
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/api/approval-letter", async (req, res) => {
  try {
    const { mobile } = req.query;

    // Fetch user details from database
    const user = await Form.findOne({ mobile: mobile });
    const bankDetails = await BankDetail.findOne();

    if (!user || !user.approval) {
      return res.status(404).json({ error: "Approval letter not found" });
    }
    function generateUniqueOTP() {
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString();
    }

    const doc = new PDFDocument({
      margins: { top: 50, bottom: 50, left: 72, right: 72 },
      size: "A4",
      info: {
        Title: "Approval Letter",
        Author: "ITC Franchisee Development Team",
      },
    });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="approval-letter.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Background Image
    const backgroundPath = path.resolve(__dirname, "./background.jpeg");

    // Load the image to get its dimensions

    const imageWidth = doc.page.width;
    const imageHeight = doc.page.height / 2;

    // Calculate the x and y coordinates to center the image
    const x = (doc.page.width - imageWidth) / 2;
    const y = (doc.page.height - imageHeight) / 2;
    doc
      .rect(x, y, imageWidth, imageHeight)
      .fillOpacity(0.8) // Adjust the opacity here (0 = fully transparent, 1 = fully opaque)
      .fill("#ffffff"); // White color overlay
    doc.image(backgroundPath, x, y, { width: imageWidth, height: imageHeight });

    // Overlay background color (optional, semi-transparent)
    // doc
    //   .rect(0, 12, doc.page.width, doc.page.height)
    //   .fillOpacity(0.9)
    //   .fill("#8490b3");

    // Logo
    const logoPath = path.resolve(__dirname, "./logo.png");
    doc.image(logoPath, doc.page.width - 120, 30, { width: 50 }).moveDown(2);

    // Header
    doc
      .fontSize(25)
      .font("Helvetica-Bold")
      .fillColor("#1a237e") // Custom header color
      .text("Approval Letter", { align: "center" })
      .moveDown(2);

    // Date and Recipient Info
    doc
      .fontSize(12)
      .fillColor("#000")
      .font("Helvetica")
      .text(`Date:  ${user?.approvalDate} `)
      .moveDown();

    doc.text(`To:`, { continued: true }).font("Helvetica-Bold").text(user.name);
    doc
      .font("Helvetica")
      .text(`Address: ${user?.address}`)
      .text(`State: ${user?.state}`)
      .text(`Pincode: ${user.pincode}`)
      .text(`Post Office: ${user.postOffice}`)
      .moveDown(2);

    // Body
    doc
      .fontSize(12)
      .fillColor("#000")
      .text(
        `Dear ${user.name},\n\nWe are pleased to inform you that your application for an ITC Franchisee has been approved. We welcome you to the ITC family and congratulate you on taking the first step towards a successful business venture.`,
        { lineGap: 5 }
      )
      .moveDown(2);

    doc
      .font("Helvetica-Bold")
      .text("Below are the details of your franchisee approval:", {
        underline: true,
      })
      .moveDown();

    doc
      .font("Helvetica")
      .list([
        `Franchisee Name: ${user.name}`,
        `Franchisee Code: itc/${generateUniqueOTP()}`,
        `Product Categories: ITC`,
        `Term: 10 Years`,
        `Renewal Terms: Every Year `,
      ])
      .moveDown(2);

    doc
      .font("Helvetica-Bold")
      .text(
        "Please note that this approval is subject to the following conditions:"
      )
      .moveDown();

    doc
      .font("Helvetica")
      .list([
        `Execution of the Franchisee Agreement within 3 days from the date of this letter.`,
        `Payment of the Franchisee fee of ₹42,500 [ Forty-two thousand Five hundred ] and other applicable charges.`,
        `Completion of the training program conducted by ITC.`,
      ])
      .moveDown(2);

    doc
      .text(
        `We request you to sign and return one copy of this letter to us within 48 hours from the date of receipt, indicating your acceptance of the terms and conditions.`,
        { lineGap: 5 }
      )
      .moveDown(2);

    doc
      .font("Helvetica-Bold")
      .text("Bank Details for Franchisee Fee Payment:", {
        underline: true,
      })
      .moveDown();

    doc
      .font("Helvetica")
      .list([
        `Account Number: ${bankDetails.accountNumber}`,
        `IFSC Code: ${bankDetails.ifscCode}`,
        `Bank Name: ${bankDetails.bankName}`,
        `Account Holder Name: ${bankDetails.holderName}`,
      ])
      .moveDown(2);

    doc.addPage();

    // Apply the background image on the second page as well

    doc.image(backgroundPath, x, y, { width: imageWidth, height: imageHeight });

    doc
      .text(
        `Please note that this payment will be adjusted against your future purchase orders. We appreciate your prompt attention to this matter and look forward to a successful partnership.`,
        { lineGap: 5 }
      )
      .moveDown(2);

    doc
      .text(
        `Congratulations once again on becoming an ITC Franchisee! We look forward to a successful partnership.`,
        { lineGap: 5 }
      )
      .moveDown(2);

    // Footer
    doc
      .fontSize(12)
      .text("Best Regards,", { lineGap: 5 })
      .moveDown()
      .font("Helvetica-Bold")
      .text("Sourav Goel")
      .font("Helvetica")
      .text("ITC Franchisee Development Team")
      .text("Email: contactus@itcportals.com");

    doc.end(); // End the PDF stream here

    // Ensure no additional writes happen after the stream ends
    doc.on("end", () => {
      res.end(); // Finalize the response
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/submit", async (req, res) => {
  const formData = new Form(req.body);
  console.log(req.body);
  try {
    await formData.save();
    await emailSender.welcomeEmail(
      req.body.email,
      req.body.mobile,
      req.body.name
    );
    res.status(200).send("Form data saved successfully");
  } catch (error) {
    res.status(500).send("Failed to save form data");
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (role === "admin") {
      if (email === "test@gmail.com" && password === "123456") {
        return res.status(200).json({ role: "admin" });
      } else {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }
    }

    if (role === "customer") {
      if (password === "abc@123") {
        // This is a basic example; use hashed passwords in production
        const user = await Form.findOne({ mobile: email }); // Use findOne to get a single document
        if (user) {
          return res.status(200).json({ role: "customer" });
        } else {
          return res.status(401).json({ error: "Customer not found" });
        }
      } else {
        return res.status(401).json({ error: "Invalid password for customer" });
      }
    }

    // Handle cases where the role is neither 'admin' nor 'customer'
    return res.status(400).json({ error: "Invalid role" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("An error occurred during login");
  }
});

app.post(`/api/leads`, async (req, res) => {
  try {
    const leads = await Form.find();
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(203).json({ message: "Something went wrong" });
  }
});

app.post(`/api/lead`, async (req, res) => {
  const { mobile } = req.body;
  try {
    const leads = await Form.findOne({ mobile });
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(203).json({ message: "Something went wrong" });
  }
});

app.post(`/api/leads/:query`, async (req, res) => {
  const { query } = req.params;
  console.log("v");
  try {
    const leads = await Form.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { mobile: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
app.post(`/api/lead/delete/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    await Form.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post(`/api/lead/sendWelcome/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const details = await Form.findById(id);
    await emailSender.welcomeEmail(details.email, details.mobile, details.name);
    return res
      .status(200)
      .json({ message: `Welcome Mail Sent Successfully! to ${details.name}` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post(`/api/lead/sendAprooval/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    const details = await Form.findByIdAndUpdate(id, {
      approval: true,
      approvalDate: moment().format("MMMM Do, YYYY"),
    });

    await emailSender.aproovalEmail(
      details.email,
      details.name,
      details.mobile,
      "abc@123",
      "https://itcportals.com/check-status"
    );
    // email: any, name: any, loginId: any, password: any, statusUrl: any
    return res
      .status(200)
      .json({ message: `Aprooval Mail Sent Successfully! to ${details.name}` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/api", async (req, res) => {
  return res.send("Hello latest");
});

app.post("/api/bank-details", async (req, res) => {
  const { bankName, accountNumber, ifscCode, holderName } = req.body;

  try {
    const bankDetail = new BankDetail({
      bankName,
      accountNumber,
      ifscCode,
      holderName,
    });
    await bankDetail.save();
    res.status(200).json({ message: "Bank details added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add bank details" });
  }
});
app.get("/api/bank-details", async (req, res) => {
  try {
    const bankDetails = await BankDetail.find();
    res.status(200).json(bankDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bank details" });
  }
});

app.delete("/api/bank-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BankDetail.findByIdAndDelete(id);
    res.status(200).json({ message: "Bank detail deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bank detail" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
