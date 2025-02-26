const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Required field
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters']
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Creating User model
const User = mongoose.model('User', userSchema);

module.exports = User;
