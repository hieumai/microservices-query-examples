import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique : true,
    dropDups: true,
    index: true
  },
  ticketState: {
    type: String,
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'WAITING_FOR_PICKUP', 'DONE'],
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
