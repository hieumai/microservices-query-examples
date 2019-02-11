import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique : true,
    dropDups: true,
    index: true
  },
  orderId: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique : true,
    dropDups: true,
    index: true
  },
  status: {
    type: String,
    enum: ['NOT_STARTED', 'ASSIGNED', 'PICKED_UP', 'DONE'],
    required: [true, 'can\'t be blank'],
    index: true
  },
  shipperId: {
    type: String,
    index: true
  },
  acceptTime: {
    type: Date
  },
  pickedUpTime: {
    type: Date
  },
  completedTime: {
    type: Date
  }

}, { timestamps: true });

mongoose.model('Delivery', DeliverySchema);
