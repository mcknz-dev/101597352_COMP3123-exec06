require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note-taking application - Week06 Exercise</h1>");
});

// Note API routes
app.use('/', noteRoutes);

// Connect to the database
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server");

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });