const express = require('express')
const app = express();
const path = require('path')
require ('dotenv').config()

//__________________________________________________________________________
// *** SET UP MONGOOSE CONNECTION ***
const mongoose = require('mongoose')

// GLOBAL LEVEL PLUGINS https://mongoosejs.com/docs/plugins.html#global

// https://www.npmjs.com/package/mongoose-beautiful-unique-validation
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const dev_db_url = 'mongodb://localhost/microblogger';
const mongoDB_url = process.env.DATABASE_URL || dev_db_url;

mongoose.connect( mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// locallibrary-tutoriaalista; mikä tämä on...
mongoose.Promise = global.Promise;

db.on('error', (err) => console.error(err))
db.once('open', () => console.log(`Connected to database ${process.env.DATABASE_URL}`));

//__________________________________________________________________________
// *** SET UP EXPRESS  ***

app.use(express.json())

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./api/user')
app.use('/api/user', usersRouter);

//const personsRouter = require('./api/person')
//app.use('/api/person', personsRouter);


PORT = process.env.PORT || 3005 

app.listen(PORT, () => console.log(`Server has started, listening to port ${PORT}`)) 