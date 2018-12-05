const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  emailAddress: { type: String, require: true },
  description: { type: String, require: true },
  meta: {
    likes: { type: Number, default: 0 },
  },
  role: { type: String, require: true, default: 'regular' },
  imagesUID: [String],
  tags: [String],
});

module.exports = mongoose.model('User', UserSchema);
