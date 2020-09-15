const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
}, { timestamps: true });
userSchema.index({ userName: 1, email: 1 });
userSchema.index({ userName: 1 });

const User = mongoose.model('user', userSchema);

module.exports = User;
