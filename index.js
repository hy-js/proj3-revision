const express = require('express');


const app = express();
const port = process.env.PORT || 3001;

// Import libraries + Data
const morgan = require('morgan');
const path = require('path');

// import our route files
const homeRouter = require("./routes/home.js")
const usersRouter = require("./routes/users.js")

// Middleware
// Logger
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS - views by default
app.set('view engine', 'ejs');
// app.set('/views', views);

// Static files - need path to access files directly
app.use(express.static(path.join(__dirname, 'public')));

// ROUTEs
app.use('/', homeRouter)
app.use('/users', usersRouter)

// GET error
app.get('*', (req, res) => {
  res.render('pages/error', { title: '404', error: '404' });
});

// Listen to correct port
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
