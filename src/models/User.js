const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Schema for NextAuth with Google Auth Provider
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String, // Password will be null if the user uses Google Auth
    required: false
  },
  image: {
    type: String, // For storing user's profile picture from Google
    required: false
  },
  googleId: {
    type: String, // To store Google user ID
    required: false
  },
  githubId: {
    type: String, // To store GitHub user ID
    required: false
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'supplier'],
    default: 'customer'
  },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, default: 'Canada' }
  },
  phoneNumber: {
    type: String,
    required: false
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
// Pre-save middleware to update the timestamp
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
// Ensure the model is not created multiple times
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);