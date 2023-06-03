const path = require('path');
const express = require('express'); // import express
const session = require('express-session'); // import express-session
const exphbs = require('express-handlebars'); // import express-handlebars
const routes = require('./controllers'); // import routes
const sequelize = require('./config/connection'); // import sequelize connection
const axios = require('axios'); // import axios
const fs = require('fs'); // import fs


const SequelizeStore = require('connect-session-sequelize')(session.Store); // import connect-session-sequelize

const hbs = exphbs.create({}); // create handlebars object
hbs.handlebars.registerPartial('navigation', fs.readFileSync(__dirname + '/views/partials/navigation.handlebars', 'utf8')); // register Navigation partial
hbs.handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/footer.handlebars', 'utf8')); // register Footer partial

const app = express(); // create express object
const PORT = process.env.PORT || 3001; // set port

const sess = { // create session object
  secret: 'Super secret secret', // secret
  cookie: {}, 
  resave: false,
  saveUninitialized: true, 
  store: new SequelizeStore({
    db: sequelize
  })
};

// app.use(session(sess)); // use session object

app.engine('handlebars', hbs.engine); // use handlebars object
app.set('view engine', 'handlebars'); // set view engine to handlebars

app.use(express.json()); // use express json
app.use(express.urlencoded({ extended: true })); // use express urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // use express static

app.use(routes); // use routes

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to port 3001'));
});