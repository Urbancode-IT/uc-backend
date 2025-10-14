 import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors('*'));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or your preferred SMTP service
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_TO,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// === POST route to send email ===
app.post("/api/send-email/internship", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    program,
    experience,
    interest,
    portfolio,
  } = req.body;

  if (!firstName  || !email ||!mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Configure transporter
   

    // Email content
    const mailOptions = {
      from: `"UC-Website Lead" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO, // your receiving email
      subject: `UC Website Lead: New Internship Application - ${program} `,
      html: `
        <h2>From UC Website: New Internship Application</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Program:</b> ${program}</p>
        <p><b>Experience:</b> ${experience}</p>
        <p><b>Interest:</b> ${interest}</p>
        <p><b>Portfolio:</b> ${portfolio || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});
app.post("/api/send-email/contact", async (req, res) => {
  const { name, email, message, mobile, interest } = req.body;

  if (!name || !email || !message || !interest || !mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
   

    // Email content
    const mailOptions = {
      from: `"UC-Website Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO, // your receiving email
      subject: `UC Website lead: Contact page message for ${interest} `,
      html: `
        <h2>From UC Website: New Contact Page Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Interested in:</b> ${interest}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

   transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});
app.post("/api/send-email/course-enquiry", async (req, res) => {
  const { name, email, phone, pin, course, message,mode } = req.body;

  if (!name || !email || !phone || !pin || !course ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    

    // Email content
    const mailOptions = {
      from: `"UC-Website Course Enquiry" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO, // your receiving email
      subject: `UC Website lead: Course Enquiry for ${course} `,
      html: `
        <h2>From UC Website: New Course Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${phone}</p>
        <p><b>Course:</b> ${course}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Pin Code:</b> ${pin}</p>
        <p><b>Mode:</b> ${mode}</p>

      `,
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
