const nodemailer = require('nodemailer');
const logger = require('winston');
const config = require('../../environment/config');
const template = require('./email.templates');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
});

const email = {};

email.sendArticleAddedEmail = async (message) => {
  try {
    const emailHtml = template.GetRenderedArticleAddedEmailHtml(message.title, message.description);

    const mailOptions = {
      from: config.email.username,
      to: config.email.adminEmailID,
      subject: 'LocalNewsApplication - New Article Added!',
      html: emailHtml,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error(`Error sending email ${err}`);
  }
};

module.exports = email;
