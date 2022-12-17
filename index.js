const express = require('express')
const routes = require('./src/app');
const app = express();
const mongoose = require('mongoose');
const refreshAll = require('./src/createDatabase');
const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//use routes to use routes in app.js
app.use(routes);

// Connect to DATABASE
const DATABASE_URL = "mongodb://localhost/subscribers";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// to create database
refreshAll();

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
