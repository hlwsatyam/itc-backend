const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
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
    unique: true
  },
  email: String,
  address: String,
  area: String,
  pincode: String,
  disctict: String,
  state: String,
  postOffice: String,
});

const Form = mongoose.model("Form", formSchema);

// API Endpoint to handle form submission
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
  console.log(req.body);
  try {
    if (
      role === "admin" &&
      email === "test@gmail.com" &&
      password === "123456"
    ) {
      return res.status(200).json({ role: "admin" });
    }
    if (role === "customer") {
      const userExist = await Form.findOne({ email: email, mobile: password });
      if (userExist) {
        return res.status(200).json({ role: "customer" });
      } else {
        return res.status(203).json({ role: "" });
      }
    } else {
      return res.status(203).json({ role: "" });
    }
  } catch (error) {
    res.status(500).send("Failed to save form data");
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

app.get("/api", async (req, res) => {
  return res.send("Hello latest");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
