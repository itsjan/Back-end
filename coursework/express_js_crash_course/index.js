const express = require('express')
const path = require('path')




const app = express();
require('dotenv').config()

// Logger middleware

app.use(require('./middleware/logger'));

// Gets all members
//   docs REQ  https://expressjs.com/en/4x/api.html#req
//             https://nodejs.org/api/http.html#http_class_http_incomingmessage


app.get('/api/members', (req, res) => {
    res.json(require('./members'));
});

app.get('/api/members/:id', (req, res) => {
    res.json(require('./members'));
});

// Logging middleware

// Static folder (Serve files in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3010;

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))

