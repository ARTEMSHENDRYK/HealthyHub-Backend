const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_EMAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL }
 
  await transport.sendMail(email)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message));
  
  return true;
}

module.exports = sendEmail;