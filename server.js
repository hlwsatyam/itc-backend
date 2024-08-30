const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const emailSender = require("./helpers/EmailSender");
// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

  nameTitle: String,
  marriageStatus: String,
  address: String,
  businessName: String,
  businessAddress: String,
  gst: String,
  fssai: String,
  businessType: String,
  experienceInBusiness: String,
  currentYearTurnover: String,
  noOfEmploy: String,
  PriviousExperienceInFranchisee: String,
  researchedOtherFranchisee: String,
  estimatedInve4stmentCapacity: String,
  preferredLocationAvailable: String,
  haveAnyBusinessPlane: String,
  projectedTimelineForOpeningFranchisee: String,
  experienceInMarketing: String,
  experienceInManagingStore: String,
  gender: String,

  qualification: String,

  approvalLetter: String,
  agreementLetterName: String,
  purchaseOrderLetterName: String,
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

app.get("/api/agreement-letter", async (req, res) => {
  const { name } = req.query;

  try {
    // Assuming your PDF files are stored in a directory called "agreements"
    const pdfDirectory = path.join(__dirname, "uploads");
    const pdfFile = path.join(pdfDirectory, `${name}`);

    // Check if the file exists
    if (fs.existsSync(pdfFile)) {
      // Send the PDF file as a response
      res.sendFile(pdfFile);
    } else {
      // If the file is not found, send a 404 response
      res.status(404).json({ error: "Agreement PDF not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/po-letter", async (req, res) => {
  const { name } = req.query;

  try {
    // Assuming your PDF files are stored in a directory called "agreements"
    const pdfDirectory = path.join(__dirname, "uploads");
    const pdfFile = path.join(pdfDirectory, `${name}`);

    // Check if the file exists
    if (fs.existsSync(pdfFile)) {
      // Send the PDF file as a response
      res.sendFile(pdfFile);
    } else {
      // If the file is not found, send a 404 response
      res.status(404).json({ error: "Purchase Order PDF not found" });
    }
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
app.post("/api/editSave/:id",  async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  try {
    await Form.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Form data Updated successfully" });
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
app.get(`/api/leadById/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const leads = await Form.findById(id);
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
app.post(`/api/lead/sendCancel/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const details = await Form.findByIdAndDelete(id);
    await emailSender.cancelEmail(details.email, details.mobile, details.name);
    return res.status(200).json({
      message: `Cancel Mail Sent Successfully! And ${details.name}'s Account Deleted`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
app.post(`/api/lead/sendBankDetail/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const details = await Form.findById(id);
    const bankDetails = await BankDetail.findOne();
    await emailSender.bankDetailShareEmail(
      details.email,
      details.name,
      bankDetails?.accountNumber,
      bankDetails?.bankName,
      bankDetails?.holderName,
      bankDetails?.ifscCode
    );
    return res.status(200).json({
      message: `Bank Details Mail Sent Successfully! to ${details.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// app.post(`/api/lead/sendAprooval/:id`, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const details = await Form.findByIdAndUpdate(id, {
//       approval: true,
//       approvalDate: moment().format("MMMM Do, YYYY"),
//     });

//     await emailSender.aproovalEmail(
//       details.email,
//       details.name,
//       details.mobile,
//       "abc@123",
//       "https://itcportals.com/check-status"
//     );
//     // email: any, name: any, loginId: any, password: any, statusUrl: any
//     return res
//       .status(200)
//       .json({ message: `Aprooval Mail Sent Successfully! to ${details.name}` });
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

app.post(
  `/api/lead/sendAgreement/:id`,
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const details = await Form.findByIdAndUpdate(id, {
        approval: true,
        agreementLetterName: req.file.filename,
      });

      await emailSender.agreementEmail(
        details.email,
        details.name,
        details.mobile,
        "abc@123",
        "https://itcportals.com/check-status"
      );
      // email: any, name: any, loginId: any, password: any, statusUrl: any
      return res.status(200).json({
        message: `Agreemrnt File Sent Successfully! to ${details.name}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);
app.post(`/api/lead/sendPO/:id`, upload.single("filePO"), async (req, res) => {
  const { id } = req.params;
  try {
    const details = await Form.findByIdAndUpdate(id, {
      purchaseOrderLetterName: req.file.filename,
    });

    await emailSender.POEmail(
      details.email,
      details.name,
      details.mobile,
      "abc@123",
      "https://itcportals.com/check-status"
    );
    // email: any, name: any, loginId: any, password: any, statusUrl: any
    return res.status(200).json({
      message: `Purchase Order File Sent Successfully! to ${details.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
app.post(
  `/api/lead/sendApprooval/:id`,
  upload.single("fileApprooval"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const details = await Form.findByIdAndUpdate(id, {
        approvalLetter: req.file.filename,
      });

      await emailSender.aproovalEmail(
        details.email,
        details.name,
        details.mobile,
        "abc@123",
        "https://itcportals.com/check-status"
      );
      // email: any, name: any, loginId: any, password: any, statusUrl: any
      return res.status(200).json({
        message: `Aprooval Letter Sent Successfully! to ${details.name}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

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
