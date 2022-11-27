const sgMail = require('@sendgrid/mail');
const { SEND_GRID_KEY, PORT = 3000 } = process.env;

const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  sgMail.setApiKey(SEND_GRID_KEY);
  const link = `${BASE_URL}/auth/verify/${code}`;
  const emailBody = {
    from: "semko74@meta.ua",
    to: userEmail,
    subject: "Please confirm your email",
    html: `<h3>Click on this link to confirm registration ${link}</h3>`,
    text: `Click on this link to confirm registration ${link}`,
  };
  const response = await sgMail.send(emailBody);
  console.log("Email sent", response);
}

module.exports = {
  sendEmail
};