const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  picture: {
    type: [String],
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
