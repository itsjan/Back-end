const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
require('dotenv').config()
const members = require('./data/members')

// https://wolfgang-ziegler.com/blog/a-scripts-section-for-your-handlebars-layout-template
var hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: {
      section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
        }
    }    
  });

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')



// Logger middleware
app.use(require('./middleware/logger'));

// Body parser Middleware
// docs https://expressjs.com/en/5x/api.html#express.urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Homepage route
app.get('/', (req, res) => { res.render('index', { title: "Members App", members })})


// Static folder (Serve files in the public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3010;

app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))

