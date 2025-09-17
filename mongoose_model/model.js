const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User',userSchema,'students');

module.exports = User;