const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

// Import libraries + Data
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const path = require('path');

// 3b
// const { users } = require('./data/data.js');

// 3C
const db = require('./database')

// Middleware
// Logger
app.use(morgan('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS - views by default
app.set('view engine', 'ejs');

// Static files - need path to access files directly
app.use(express.static(path.join(__dirname, 'public')));

// ROUTE
// GET home page
app.get('/', (req, res) => {
  res.render('pages/home', {title: 'Home'});
});

// GET all users
app.get('/users', (req, res) => {
  db.any('SELECT * FROM users')
  .then((users) => {
      // if success;
      console.log(users)

      res.render('pages/users',
      {users,
      title: 'ALL users'})
  })
  .catch((error) => {
      // error;
      console.log(error)
      res.redirect("/error?message=" + error.message)
  });
});

// GET user form
app.get('/users/add', (req, res) => {
  res.render('pages/newUser', {title: 'Add User'});
});

// GET specific users
app.get('/users/:user_id', (req, res) => {
  const index = req.params.user_id;
  const user = users[index];

  // validation to confirm number has been entered
  if (index >= users.length) {
    res.status(400).send(`msg: User ${index} is not found`);
  }
  res.render('pages/user', {user})
});

// POST new user
app.post('/users', (req, res) => {
  // 1. Destructure user keys
  const { firstname, lastname, email, password } = req.body;
  // 2. Encrypt the password with bcryptJS
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  // Store hash in your password DB by creating new user
  const newUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hash
  };

  // Push newUser to data array and redirect to users
  users.push(newUser);
  res.redirect('/users');
});

// GET error
app.get('*', (req, res) => {
   res.render('pages/error', {title: '404'});
 });

// Listen to correct port
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
