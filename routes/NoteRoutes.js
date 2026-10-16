const noteModel = require('../models/NotesModel');
const express = require('express');
const noteRoutes = express.Router();

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const note = new noteModel({
            noteTitle: req.body.content.noteTitle,
            noteDescription: req.body.content.noteDescription,
            priority: req.body.content.priority,
            dateAdded: req.body.content.dateAdded,
            dateUpdated: req.body.content.dateUpdated
        });

        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error creating the note"
        });
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving notes"
        });
    }
});

// Retrieve a single Note using noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.status(200).send(note);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving the note"
        });
    }
});

// Update a Note using noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.content.noteTitle,
                noteDescription: req.body.content.noteDescription,
                priority: req.body.content.priority,
                dateAdded: req.body.content.dateAdded,
                dateUpdated: req.body.content.dateUpdated
            },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.status(200).send(updatedNote);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating the note"
        });
    }
});

// Delete a Note using noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(
            req.params.noteId
        );

        if (!deletedNote) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.status(200).send({
            message: "Note deleted successfully"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting the note"
        });
    }
});

module.exports = noteRoutes;