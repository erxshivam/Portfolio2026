const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    await newMessage.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",

      html: `
        <h2>New Message</h2>

        <p><strong>Name:</strong> ${req.body.name}</p>

        <p><strong>Email:</strong> ${req.body.email}</p>

        <p><strong>Message:</strong> ${req.body.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");

    console.log(req.body);

    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});