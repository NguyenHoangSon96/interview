const mongoose = require('mongoose');
const { Schema } = mongoose;

const { BOOKING_STATUS_PENDING, BOOKING_STATUS_APPROVED, BOOKING_STATUS_REJECTED,
        EVENT_HEALTH_TALK, EVENT_WELLNESS, EVENT_FITNESS_ACTIVITIES  } = require('../constant/constant');

const bookingSchema = new Schema({
  status: {
    type: Schema.Types.ObjectId,
    ref: 'globalConfig'
  },
  eventType: {
    type: Schema.Types.ObjectId,
    ref: 'globalConfig'
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
}, { timestamps: true });
bookingSchema.index({ userName: 1, email: 1 });
bookingSchema.index({ userName: 1 });

const Booking = mongoose.model('user', bookingSchema);

module.exports = Booking;
