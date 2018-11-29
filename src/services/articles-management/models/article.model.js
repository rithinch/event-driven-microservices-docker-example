const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const ArticleSchema = new Schema({
  authorUID: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  title: String,
  description: String,
  body: String,
  meta: {
    likes: { type: Number, default: 0 },
  },
  status: { type: Number },
  imagesUID: [String],
  tags: [String],
});

module.exports = mongoose.model('Article', ArticleSchema);
