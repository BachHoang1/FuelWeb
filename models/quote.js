const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  gallons: Number,
  address: String,
  orderdate: {
    type: String,
    default: Date,
  },
  deliverydate: {
    type: String,
    default: 'N/A',
  },
  suggestedPrice: {
    type: Number,
    default: 0.0,
  },
  total: {
    type: Number,
    default: 0.0,
  },
});

// QuoteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Quote', QuoteSchema);
