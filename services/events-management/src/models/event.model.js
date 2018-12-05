const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  authorUID: { type: String, require: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  eventDate: { type: Date, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  body: { type: String, require: true },
  meta: {
    attending: { type: Number, default: 0 },
  },
  status: { type: Number },
  imagesUID: [String],
  tags: [String],
});

module.exports = mongoose.model('Event', EventSchema);
