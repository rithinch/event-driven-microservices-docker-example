const template = require('../../src/modules/email/email.templates');

describe('Article Added Email Template', () => {
  test('Should return correct email template', () => {
    const html = template.GetRenderedArticleAddedEmailHtml('Test Name', 'Test Text');
    expect(html).toMatchSnapshot();
  });

  test('Should return correct email template when no data is passed', () => {
    const html = template.GetRenderedArticleAddedEmailHtml();
    expect(html).toMatchSnapshot();
  });
});
