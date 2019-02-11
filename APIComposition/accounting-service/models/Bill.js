import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
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
    enum: ['UNPAID', 'PAID'],
    required: [true, 'can\'t be blank'],
    index: true
  }

}, { timestamps: true });

mongoose.model('Bill', BillSchema);
