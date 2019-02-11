import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique : true,
    dropDups: true,
    index: true
  },
  customerName: {
    type: String,
  },
  orderTime: {
    type: Date
  }

}, { timestamps: true });

mongoose.model('Order', OrderSchema);
