const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  emailAddress: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true, default: 'regular' },
  status: { type: String, default: 'active' },
});

module.exports = mongoose.model('Auth', AuthSchema);
