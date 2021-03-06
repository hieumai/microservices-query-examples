import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique: true,
    dropDups: true,
    index: true
  },
  orderId: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique: true,
    dropDups: true,
    index: true
  },
  status: {
    type: String,
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'PREPARED', 'DONE'],
    required: [true, 'can\'t be blank'],
    index: true
  },
  restaurantId: {
    type: String,
    required: [true, 'can\'t be blank'],
    index: true
  },
  acceptTime: {
    type: Date
  },
  pickedUpTime: {
    type: Date
  },
  readyForPickupTime: {
    type: Date
  }

}, { timestamps: true });

mongoose.model('Ticket', TicketSchema);
