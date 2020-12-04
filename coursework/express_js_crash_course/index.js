const express = require('express')
const path = require('path')
const members = require('./members')



const app = express();
require('dotenv').config()

// Logger middleware

app.use(require('./middleware/logger'));

// Gets all members
//   docs REQ  https://expressjs.com/en/4x/api.html#req
//             https://nodejs.org/api/http.html#http_class_http_incomingmessage

// Get Members

app.get('/api/members', (req, res) => {
    res.json(members);
});

// Get single member

app.get('/api/members/:id', (req, res) => {
    // some() returns true/false
    const exists = members.some(m => m.id === parseInt(req.params.id))
    exists ?
        res.json(members.filter(member => member.id === parseInt(req.params.id))) :
        res.status(400).json({message: ` Member with ID#${req.params.id} does not exist in the database`});

   
});

// Logging middleware

// Static folder (Serve files in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3010;

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))

