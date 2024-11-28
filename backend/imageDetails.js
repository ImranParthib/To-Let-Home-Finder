const mongoose = require('mongoose');

const imageDetailsSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true
  }
});

mongoose.model('ImageDetails', imageDetailsSchema);