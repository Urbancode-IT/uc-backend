import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow only specific origins for better security
app.use(cors({
  origin: ['https://urbancode.tech', 'https://inout.urbancode.tech', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ✅ Configure transporter once globally
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER, // should match the "from" address
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Test transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server Ready to Send Emails");
  }
});

// === Internship Form ===
app.post("/api/send-email/internship", async (req, res) => {
  const { firstName, lastName, email, mobile, program, experience, interest, portfolio } = req.body;

  if (!firstName || !email || !mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: `"UC-Website Lead" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `UC Website Lead: Internship Application - ${program}`,
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Contact Form ===
app.post("/api/send-email/contact", async (req, res) => {
  const { name, email, message, mobile, interest } = req.body;

  if (!name || !email || !message || !interest || !mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: `"UC-Website Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `UC Website Lead: Contact Page Message for ${interest}`,
    html: `
      <h2>From UC Website: New Contact Page Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Mobile:</b> ${mobile}</p>
      <p><b>Interest:</b> ${interest}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Course Enquiry Form ===
app.post("/api/send-email/course-enquiry", async (req, res) => {
  const { name, email, phone, pin, course, message, mode } = req.body;

  if (!name || !email || !phone || !pin || !course) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: `"UC-Website Course Enquiry" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `UC Website Lead: Course Enquiry for ${course}`,
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Server Start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
