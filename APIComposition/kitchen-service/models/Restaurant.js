import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'can\'t be blank'],
    unique : true,
    dropDups: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'can\'t be blank'],
    index: true
  }
}, { timestamps: true });

mongoose.model('Restaurant', RestaurantSchema);
