import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
};



// import nodemailer from "nodemailer";
// import dns from "node:dns";

// export const sendVerificationEmail = async (email, code) => {
//   console.log("EMAIL_USER:", process.env.EMAIL_USER);
//   console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);



// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     servername: "smtp.gmail.com",
//   },
//   getSocket: (options, callback) => {
//     dns.lookup(options.host, { family: 4 }, (err, address) => {
//       if (err) return callback(err);

//       options.host = address;
//       callback(null, false);
//     });
//   },
// });

//   const info = await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify Your Account",
//     html: `
//       <h2>Welcome!</h2>
//       <p>Your verification code is:</p>
//       <h1>${code}</h1>
//     `,
//   });

//   console.log(info.messageId);
// };