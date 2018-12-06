/* eslint-disable no-unused-vars */
jest.mock('winston');
jest.mock('../../src/modules/email/email');

const winston = require('winston');
const email = require('../../src/modules/email/email');
const articleMessageController = require('../../src/message-controllers/articles');

const message = {
  content: {
    title: 'Test Article',
    description: 'Test Text',
  },
};

describe('Article Added Message Controller', async () => {
  afterEach(() => {
    email.sendArticleAddedEmail.mockClear();
  });

  test('Should succeed when correct message content is passed', async () => {
    articleMessageController.added({ content: Buffer.from(JSON.stringify(message.content)) });
    expect(winston.error).not.toBeCalled();
    expect(email.sendArticleAddedEmail).toBeCalledTimes(1);
    expect(email.sendArticleAddedEmail).toBeCalledWith(message.content);
  });

  test('Should throw an error when correct message content is null', async () => {
    articleMessageController.added(null);
    expect(winston.error).toBeCalled();
    expect(email.sendArticleAddedEmail).not.toBeCalled();
  });

  test('Should throw an error when sending email fails', async () => {
    email.sendArticleAddedEmail = jest.fn((content) => {
      throw new Error();
    });
    articleMessageController.added({ content: Buffer.from(JSON.stringify(message.content)) });
    expect(winston.error).toBeCalled();
    expect(email.sendArticleAddedEmail).toBeCalledTimes(1);
    expect(email.sendArticleAddedEmail).toBeCalledWith(message.content);
  });
});
