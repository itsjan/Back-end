const path = require('path')
const express = require('express');
const server = express();
const mongoose = require('mongoose');
//require('dotenv').config();

// Setting up database connection
const dev_db_url = 'mongodb://localhost/';
const dev_db_name = 'club-test';
const mongoDB_url = process.env.DATABASE_URL || dev_db_url;
const db_name = process.env.DATABASE_NAME || dev_db_name;
mongoose.connect( `${mongoDB_url}${db_name}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log(`Connected to database on ${db.host}. Using database ${db_name} `));

// Setting up Express middleware

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

// ROUTES

//server.use('/drinks', require('./routes/drinks'));
server.use('/memberships', require('./routes/memberships'));
server.use('/orders/', require('./routes/orders'));


// Starting server

PORT = process.env.PORT || 3005 
server.listen(PORT, () => console.log(`Server has started, listening to port ${PORT}`)) 
