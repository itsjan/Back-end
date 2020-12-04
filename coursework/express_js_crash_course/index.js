const express = require('express')
const app = express();
const path = require('path')
require('dotenv').config()


// Logger middleware
app.use(require('./middleware/logger'));

// Static folder (Serve files in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3010;

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))

