import Router from 'koa-router';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

const router = new Router();

// Email address where the message result should be delivered.
const emailTo = 'thebutchersmarket@gmail.com';
// From email address, in case your server prohibits sending emails from addresses other than those
// of your own domain (e.g. email@yourdomain.com). If this is used then all email messages from your
// contact form will appear from this address instead of actual sender.
const emailFrom = 'drew@thebutchersmarket.com';
// This will be the subject of the contact form message
const emailSubject = 'Butcher Contact';

const isBlank = function(field) {
  return field === undefined || field === null || field.trim() === '';
};

const generateValidationError = function(field, title) {
  return {
    status: 422,
    code: 100,
    title,
    source: {
      pointer: `/data/attributes/${field}`,
    },
  };
};

const validationErrorResponse = function(ctx, errors) {
  ctx.status = 422;
  ctx.body = { errors };
};

router.post('/', async ctx => {
  const { name, email, message, recaptchaToken } = ctx.request.body.data.attributes;
  let errors = [];

  if (isBlank(name)) {
    errors.push(generateValidationError('name', 'Name is required'));
  }

  if (isBlank(email)) {
    errors.push(generateValidationError('email', 'Email is required'));
  }

  if (isBlank(message)) {
    errors.push(generateValidationError('message', 'Message is required'));
  }

  if (errors.length > 0) {
    return validationErrorResponse(ctx, errors);
  }

  const recaptchaResult = await verifyRecaptcha(recaptchaToken);

  if (recaptchaResult === false) {
    let error = generateValidationError('message', 'Message is required');
    return validationErrorResponse(ctx, [error]);
  }

  const mailSent = await sendMail(name, email, message);

  if (mailSent === false) {
    ctx.status = 500;
    ctx.body = {
      errors: [
        {
          status: 500,
          title: 'Mail could not be sent',
        },
      ],
    };
    return;
  }

  ctx.status = 204;
});

async function verifyRecaptcha(token) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping recaptcha due to environment');
    return true;
  }

  const secretKey = process.env.RECAPTCHA_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(url, { method: 'POST' });
    const json = await response.json();

    return json.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function sendMail(name, email, message) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping email sending due to environment');
    return true;
  }

  const text = `Name: ${name}\r\n\r\nEmail Address: ${email}\r\n\r\nMessage:\r\n${message}\r\n\r\n`;

  try {
    let transporter = nodemailer.createTransport({
      sendmail: true,
      path: '/usr/sbin/sendmail',
    });

    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: emailSubject,
      text,
    });

    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}

export default router.routes();
