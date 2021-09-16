const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "07f385c6aa9616", 
      pass: "7edc0eaa105ee3",
    },
});
  
module.exports = transporter;