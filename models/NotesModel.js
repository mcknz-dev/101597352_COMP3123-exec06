const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM'],
        required: true
    },
    dateAdded: {
        type: String,
        required: true
    },
    dateUpdated: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notes', NoteSchema);