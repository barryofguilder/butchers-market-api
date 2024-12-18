import Router from 'koa-router';
import nodemailer from 'nodemailer';

import { isBlank } from '../utilities/is-blank';

const router = new Router();

const generateValidationError = function (field, title) {
  return {
    status: 422,
    code: 100,
    title,
    source: {
      pointer: `/data/attributes/${field}`,
    },
  };
};

const validationErrorResponse = function (ctx, errors) {
  ctx.status = 422;
  ctx.body = { errors };
};

router.post('/', async (ctx) => {
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
    let error = generateValidationError('recaptchaToken', 'reCaptcha token is not valid');
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
  if (!import.meta.env.PROD) {
    console.log('Skipping recaptcha due to environment');
    return true;
  }

  const secretKey = import.meta.env.VITE_RECAPTCHA_KEY;
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
  if (!import.meta.env.PROD) {
    console.log('Skipping email sending due to environment');
    return true;
  }

  const text = `Name: ${name}\r\n\r\nEmail Address: ${email}\r\n\r\nMessage:\r\n${message}\r\n\r\n`;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.VITE_EMAIL_USER,
        pass: import.meta.env.VITE_EMAIL_PASSWORD,
      },
    });

    const response = await transporter.sendMail({
      from: import.meta.env.VITE_FEEDBACK_EMAIL_FROM,
      to: import.meta.env.VITE_FEEDBACK_EMAIL_TO,
      replyTo: email,
      subject: import.meta.env.VITE_FEEDBACK_EMAIL_SUBJECT,
      text,
    });

    console.log('Email response: ', response);

    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}

export default router.routes();
