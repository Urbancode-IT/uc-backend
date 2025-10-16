import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['https://www.urbancode.in', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// === Internship form ===
app.post("/api/send-email/internship", async (req, res) => {
  const { firstName, lastName, email, mobile, program, experience, interest, portfolio } = req.body;

  if (!firstName || !email || !mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "UC Website <info@urbancode.in>", // can use your verified domain or temporary @resend.dev
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
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Contact form ===
app.post("/api/send-email/contact", async (req, res) => {
  const { name, email, message, mobile, interest } = req.body;

  if (!name || !email || !message || !interest || !mobile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "UC Website <info@urbancode.in>",
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
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Course enquiry form ===
app.post("/api/send-email/course-enquiry", async (req, res) => {
  const { name, email, phone, pin, course, message, mode } = req.body;

  if (!name || !email || !phone || !pin || !course) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "UC Website <info@urbancode.in>",
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
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// === Server start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
