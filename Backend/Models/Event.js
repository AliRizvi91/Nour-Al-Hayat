const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for an event
const eventSchema = new Schema({
  image: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
  time: {
    type: Schema.Types.String, // Example format: 'HH:MM AM/PM'
    required: true,
  },
  location: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  maxAttendees: {
    type: Schema.Types.Number,
    required: true,
  },
});

// Create a model from the schema
const Event_M = mongoose.model('Event', eventSchema);

// Export the model
module.exports = Event_M;
