const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    Name: String,
    Password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('UserDetails', UserSchema);
