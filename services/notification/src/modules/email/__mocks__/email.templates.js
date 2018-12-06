const templates = {};

templates.GetRenderedArticleAddedEmailHtml = jest.fn((title, description) => `${title}, ${description}`);

module.exports = templates;
