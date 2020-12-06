const express = require('express')
const app = express();
const path = require('path')
require ('dotenv').config()


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
//mongoose.Promise = global.Promise;

db.on('error', (err) => console.error(err))
db.once('open', () => console.log(`Connected to database ${process.env.DATABASE_URL}`));

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
const usersRouter = require('./api/users')
app.use('/api/users', usersRouter);
const postsRouter = require('./api/posts');
app.use('/api/posts', postsRouter);


PORT = process.env.PORT || 3005 

app.listen(PORT, () => console.log(`Server has started, listening to port ${PORT}`)) 