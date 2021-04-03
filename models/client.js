const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    newAcc: {
        type: Boolean,
        default: true
    },
    name: {
        firstName: String,
        lastName: String,
    },
    username: String,
    dateCreated: { 
        type: String,
        default: Date()
    },
    password: String,
    email: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: Number
    },
    address2: {
        street: String,
        city: String,
        state: String,
        zipcode: Number
    },
    quoteHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote"
    }]
});

ClientSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("Client", ClientSchema);