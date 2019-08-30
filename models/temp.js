const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const temp = new Schema({
    temp: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
});

// setter 
temp.path('temp').set((input) => {
    return input.toString().trim();
});

module.exports = mongoose.model('Temp', temp);

