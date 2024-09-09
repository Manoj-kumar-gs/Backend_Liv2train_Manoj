const mongoose = require('mongoose');
const validator = require('validator');

// Address sub-schema
const addressSchema = new mongoose.Schema({
  detailedAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid pincode!`
    }
  }
});

// Training Center schema
const trainingCenterSchema = new mongoose.Schema({
  centerName: {
    type: String,
    required: true,
    maxlength: 40
  },
  centerCode: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]{15}$/.test(v);
      },
      message: props => `${props.value} must be 12 alphanumeric characters`
    }
  },
  address: {
    type: addressSchema,
    required: true
  },
  studentCapacity: {
    type: Number,
    default: 0
  },
  coursesOffered: {
    type: [String],
    default: []
  },
  createdOn: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  },
  contactEmail: {
    type: String,
    validate: [validator.isEmail, 'Invalid email']
  },
  contactPhone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} must be a 10-digit phone number`
    }
  }
});

module.exports = mongoose.model('TrainingCenter', trainingCenterSchema);
