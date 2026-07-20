import dns from "node:dns";
import nodemailer from "nodemailer";

// Force Node.js to prefer IPv4 over IPv6
dns.setDefaultResultOrder("ipv4first");


export const sendVerificationEmail = async (email, code) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  const result = await dns.promises.lookup("smtp.gmail.com", {
  family: 4,
});

console.log("DNS lookup:", result);

const transporter = nodemailer.createTransport({
 host: result.address,
tls: {
  servername: "smtp.gmail.com",
},
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

try {
  await transporter.verify();
  console.log("SMTP connection successful");

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Account",
    html: `
      <h2>Welcome!</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
    `,
  });

  console.log(info.messageId);
} catch (err) {
  console.error("SMTP Error:", err);
  throw err;
}}