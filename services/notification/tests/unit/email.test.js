/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
jest.mock('nodemailer');
jest.mock('winston');
jest.mock('../../src/modules/email/email.templates');

const nodemailer = require('nodemailer');
const winston = require('winston');
const templates = require('../../src/modules/email/email.templates');

const message = {
  title: 'Test Article',
  description: 'Test Text',
};

describe('Email Options', () => {
  test('Shoud set the correct email credentials', () => {
    require('../../src/modules/email/email');
    expect(nodemailer.createTransport).toBeCalledTimes(1);
    expect(nodemailer.createTransport.mock.calls[0][0]).toMatchSnapshot();
    expect(winston.error).not.toBeCalled();
  });
});

describe('Send Article Added Email', () => {
  afterEach(() => {
    templates.GetRenderedArticleAddedEmailHtml.mockClear();
  });

  test('Shoud send email when correct details are provided', () => {
    const email = require('../../src/modules/email/email');

    email.sendArticleAddedEmail(message);

    expect(templates.GetRenderedArticleAddedEmailHtml).toBeCalledTimes(1);
    expect(templates.GetRenderedArticleAddedEmailHtml)
      .toBeCalledWith(message.title, message.description);

    expect(nodemailer.sendMail.mock.calls.length).toBe(1);
    expect(nodemailer.sendMail.mock.calls[0][0]).toMatchSnapshot();
  });

  test('Shoud throw an error when an exception occurs', () => {
    templates.GetRenderedArticleAddedEmailHtml = jest.fn((title, description) => {
      throw new Error();
    });

    const email = require('../../src/modules/email/email');

    email.sendArticleAddedEmail(message);

    expect(templates.GetRenderedArticleAddedEmailHtml).toBeCalledTimes(1);
    expect(templates.GetRenderedArticleAddedEmailHtml)
      .toBeCalledWith(message.title, message.description);

    expect(nodemailer.sendMail.mock.calls.length).toBe(1);
    expect(nodemailer.sendMail.mock.calls[0][0]).toMatchSnapshot();

    expect(winston.error).toBeCalledTimes(1);
  });
});
