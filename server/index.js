const express = require('express');
const cors = require('cors'); // import cors for cross-origin resource sharing
const bodyParser = require('body-parser'); // import body-parser for parsing request bodies
const mongoose = require('mongoose'); // import mongoose for interacting with MongoDB
const todoRoutes = require('./routes/todoRoutes'); // import todo routes
const userRoutes = require('./routes/userRoutes'); // import user routes
const connectionToDB = require('./middleware/dbConnection');

const app = express(); // create express app
const port = 8080; // port to listen on

app.use(cors()); // use cors
app.use(express.json()); // use express.json to parse json bodies
app.use(bodyParser.json()); // use body-parser to parse json bodies


// Connect to MongoDB
connectionToDB()

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
