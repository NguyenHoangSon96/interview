const mongoose = require('mongoose');
const { Schema } = mongoose;

const globalConfig = new Schema({
  group: {
    type: String,
    require: true,
  },
  key: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  createdBy: {
    type: String,
    require: true,
  },
}, { timestamps: true });

const GlobalConfig = mongoose.model('globalConfig', globalConfig);

module.exports = GlobalConfig;
