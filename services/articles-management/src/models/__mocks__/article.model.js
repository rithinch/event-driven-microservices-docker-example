/* eslint-disable arrow-body-style */

const articleModel = {};

let data = [];

articleModel.find = jest.fn(() => data);

articleModel.findById = jest.fn((id) => {
  return data.find(article => article.id === id);
});

articleModel.create = jest.fn((article) => {
  data.push(article);
  return article;
});

articleModel.findByIdAndUpdate = jest.fn((id, updatedArticle) => {
  const index = data.findIndex(article => article.id === id);
  if (index >= 0) {
    data[index] = updatedArticle;
  }
  return updatedArticle;
});

articleModel.findByIdAndRemove = jest.fn((id) => {
  const index = data.findIndex(article => article.id === id);
  data.splice(index, 1);
  return id;
});

articleModel.count = () => data.length;
articleModel.reset = () => { data = []; };

module.exports = articleModel;
