const express = require('express')
const path = require('path')

const app = express();
require('dotenv').config()

members = [
    { id:1, name: 'John Doe', email: 'jd@email.com', status:'a'},
    { id:2, name: 'John Doe Sr', email: 'jd.sr@email.com', status:'a'},
    { id:2, name: 'John Doe Jr', email: 'jd.jr@email.com', status:'a'},
]

app.get('/api/members', (req, res) => {
    res.json(members);
});

// Static folder (Serve files in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3010;

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))



// Quokka

