const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();

const allowedOrigins = [
  "https://dotclass.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Handle preflight for all routes
app.options(/.*/, cors());
app.use(express.json());

/* --------------------------------------------------
   Email Configuration
-------------------------------------------------- */
function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL — more reliable on cloud platforms than port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });
}

// Log env var presence at startup (never log the actual values)
console.log("EMAIL_USER set:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD set:", !!process.env.EMAIL_PASSWORD);

/* --------------------------------------------------
   Telegram Alert
-------------------------------------------------- */
async function sendTelegramAlert(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log("Telegram config missing");
    return;
  }
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message
  });
}

/* --------------------------------------------------
   Confirmation Email to Sender
-------------------------------------------------- */
async function sendConfirmationEmail(name, senderEmail, reason, method) {
  const reasonLabel = reason || "General";
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Message Received – DotClass</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { margin: 0; padding: 0; background: #f0f7f2; font-family: 'Inter', sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 40px rgba(71,186,116,0.12); }
    .header { background: linear-gradient(135deg, #47BA74 0%, #3ea664 100%); padding: 48px 40px 36px; text-align: center; }
    .header .icon { width: 72px; height: 72px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .header h1 { color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); font-size: 15px; margin: 0; }
    .body { padding: 40px; }
    .greeting { font-size: 16px; color: #1a1a2e; font-weight: 600; margin-bottom: 12px; }
    .text { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 24px; }
    .card { background: #f6fbf8; border: 1px solid #d4eddf; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
    .card-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
    .card-row:last-child { margin-bottom: 0; }
    .badge { background: #47BA74; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
    .card-label { font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    .card-value { font-size: 15px; color: #1a1a2e; font-weight: 600; }
    .highlight-box { background: linear-gradient(135deg, #edfaf3 0%, #f6fbf8 100%); border-left: 4px solid #47BA74; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; }
    .highlight-box p { margin: 0; font-size: 15px; color: #2d6a4f; line-height: 1.65; font-style: italic; }
    .timeline { display: flex; gap: 0; margin-bottom: 32px; }
    .step { flex: 1; text-align: center; position: relative; }
    .step:not(:last-child)::after { content: ''; position: absolute; top: 16px; left: 50%; width: 100%; height: 2px; background: linear-gradient(to right, #47BA74, #d4eddf); }
    .step-dot { width: 32px; height: 32px; border-radius: 50%; background: #47BA74; color: white; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; position: relative; z-index: 1; margin-bottom: 8px; }
    .step-label { font-size: 12px; color: #888; line-height: 1.4; }
    .cta { text-align: center; margin-bottom: 32px; }
    .cta a { display: inline-block; background: linear-gradient(135deg, #47BA74 0%, #3ea664 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 99px; letter-spacing: 0.3px; box-shadow: 0 4px 20px rgba(71,186,116,0.35); }
    .footer { background: #f6fbf8; border-top: 1px solid #e8f5ee; padding: 28px 40px; text-align: center; }
    .footer .logo { font-size: 18px; font-weight: 700; color: #47BA74; letter-spacing: -0.5px; margin-bottom: 8px; }
    .footer p { font-size: 13px; color: #aaa; margin: 0; line-height: 1.6; }
    .footer a { color: #47BA74; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <div class="icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h1>Message Received! ✨</h1>
      <p>We've got your inquiry and we're already on it.</p>
    </div>

    <!-- Body -->
    <div class="body">
      <p class="greeting">Hey ${name} 👋</p>
      <p class="text">
        Thanks for reaching out to <strong>DotClass</strong>! Your message landed safely in our inbox
        and our AI-powered support team has already flagged it for review. You're in good hands.
      </p>

      <!-- Inquiry Summary -->
      <div class="card">
        <div class="card-row">
          <div style="flex:1">
            <div class="card-label">Inquiry Type</div>
            <div class="card-value">${reasonLabel}</div>
          </div>
          <span class="badge">${method}</span>
        </div>
        <div class="card-row">
          <div style="flex:1">
            <div class="card-label">Reference ID</div>
            <div class="card-value" style="font-family: monospace; letter-spacing:1px;">DC-${Date.now().toString(36).toUpperCase()}</div>
          </div>
        </div>
        <div class="card-row">
          <div style="flex:1">
            <div class="card-label">Submitted At</div>
            <div class="card-value">${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "long", timeStyle: "short" })} EST</div>
          </div>
        </div>
      </div>

      <!-- Quote / highlight -->
      <div class="highlight-box">
        <p>
          "At DotClass, every message matters. Whether you're here for support, collaboration, or
          just a question — we treat every inquiry with the same dedication we bring to education."
        </p>
      </div>

      <!-- What happens next timeline -->
      <p class="text" style="margin-bottom: 16px; font-weight: 600; color: #1a1a2e;">What happens next?</p>
      <div class="timeline">
        <div class="step">
          <div class="step-dot">1</div>
          <div class="step-label">AI triage<br/>your inquiry</div>
        </div>
        <div class="step">
          <div class="step-dot">2</div>
          <div class="step-label">Team member<br/>assigned</div>
        </div>
        <div class="step">
          <div class="step-dot">3</div>
          <div class="step-label">You hear<br/>from us!</div>
        </div>
      </div>

      <p class="text">
        We typically respond within <strong>5 minutes</strong> during business hours. 
        In the meantime, feel free to explore what DotClass has to offer.
      </p>

      <div class="cta">
        <a href="https://dotclass.com">Explore DotClass →</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="logo">DotClass</div>
      <p>
        This is an automated confirmation. Please don't reply to this email.<br/>
        Questions? Reach us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"DotClass Team" <${process.env.EMAIL_USER}>`,
    to: senderEmail,
    subject: `✅ Got it, ${name}! Your DotClass inquiry is in safe hands`,
    html,
    text: `Hey ${name}! Thanks for reaching out to DotClass. We've received your ${reasonLabel} inquiry and will get back to you shortly. Reference ID: DC-${Date.now().toString(36).toUpperCase()}`
  });
}

/* --------------------------------------------------
   Styled Notification to Team
-------------------------------------------------- */
async function sendTeamNotificationEmail(name, contact, reason, message, method) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #f4f7f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #47BA74; padding: 30px; text-align: center; color: white; }
    .content { padding: 40px; }
    .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
    .value { color: #1a1a2e; font-size: 16px; font-weight: 600; margin-bottom: 25px; }
    .message-box { background: #f9fbf9; border-left: 4px solid #47BA74; padding: 20px; border-radius: 8px; font-style: italic; color: #444; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #aaa; background: #fafafa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0">🚀 New Business Lead</h2>
      <p style="margin:5px 0 0; opacity:0.8">DotClass Contact Engine</p>
    </div>
    <div class="content">
      <div class="label">Sender Name</div>
      <div class="value">${name}</div>

      <div class="label">Contact Detail</div>
      <div class="value">${contact} (${method.toUpperCase()})</div>

      <div class="label">Inquiry Reason</div>
      <div class="value">${reason || "General"}</div>

      <div class="label">Message</div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      Generated by DotClass AI Core • ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"DotClass Leads" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🔥 New Inquiry: ${name} — ${reason || "Lead"}`,
    html,
    text: `New Inquiry from ${name}\nContact: ${contact}\nReason: ${reason}\nMessage: ${message}`
  });
}

/* --------------------------------------------------
   Test Route
-------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    emailUserSet: !!process.env.EMAIL_USER,
    emailPasswordSet: !!process.env.EMAIL_PASSWORD,
  });
});

/* --------------------------------------------------
   Debug: Test Email Route
-------------------------------------------------- */
app.get("/api/test-email", async (req, res) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return res.status(500).json({ 
      error: "Missing env vars", 
      emailUserSet: !!process.env.EMAIL_USER, 
      emailPasswordSet: !!process.env.EMAIL_PASSWORD 
    });
  }
  try {
    const transporter = createTransporter();
    await transporter.verify();
    await transporter.sendMail({
      from: `"DotClass Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "✅ DotClass Email Test",
      text: "If you see this, Nodemailer is working correctly!"
    });
    res.json({ success: true, message: "Test email sent to " + process.env.EMAIL_USER });
  } catch (err) {
    res.status(500).json({ error: err.message, code: err.code });
  }
});

/* --------------------------------------------------
   Contact Send Route
-------------------------------------------------- */
app.post("/api/contact/send", async (req, res) => {
  try {
    const { name, contact, message, method, reason } = req.body;
    console.log("📩 Contact endpoint hit");
    console.log(req.body);

    if (method === "email") {
      console.log("📧 Email method selected. Checking environment variables...");
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error("❌ Critical: EMAIL_USER or EMAIL_PASSWORD not set in environment!");
        return res.status(500).json({ error: "Email configuration missing on server." });
      }

      try {
        console.log("📧 Attempting to send team notification...");
        await sendTeamNotificationEmail(name, contact, reason, message, method);
        console.log("✅ Team notification sent");

        console.log("📧 Attempting to send confirmation to sender...");
        await sendConfirmationEmail(name, contact, reason, method);
        console.log("✅ Sender confirmation sent");
      } catch (mailError) {
        console.error("❌ Mailer Error:", mailError);
        return res.status(500).json({ 
          error: "Failed to send email.", 
          details: mailError.message 
        });
      }
    }

    if (method === "sms") {
      const telegramMessage = `
🚨 New Inquiry

Name: ${name}
Contact: ${contact}
Reason: ${reason}

Message:
${message}
`;
      await sendTelegramAlert(telegramMessage);
    }

    if (method === "whatsapp") {
      const url = generateWhatsApp(name, contact, message);
      return res.json({ whatsapp: url });
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

function generateWhatsApp(name, contact, message) {
  const text = encodeURIComponent(
`New Website Inquiry

Name: ${name}
Contact: ${contact}

${message}`
  );
  return `https://wa.me/18768553715?text=${text}`;
}

/* --------------------------------------------------
   Start Server
-------------------------------------------------- */
const http = require("http");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});