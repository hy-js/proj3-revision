const express = require('express')
const db = require('../database');
const bcrypt = require('bcryptjs');
const router = express.Router()

// GET all users
router.get('/', (req, res) => {
   // pg-promise
   db.any('SELECT * FROM users')
     .then((users) => {
       // if success;
       console.log(users);

       res.render('pages/users', { users, title: 'ALL users' });
     })
     .catch((error) => {
       // error;
       console.log(error);
       res.redirect('/error?message=' + error.message);
     });
 });

 // GET user form
 router.get('/add', (req, res) => {
   res.render('pages/newUser', { title: 'Add User' });
 });

 // GET specific users
 router.get('/:user_id', (req, res) => {
   const index = req.params.user_id;
   db.oneOrNone('SELECT * FROM users WHERE id = $1', [index])
     // const user = users[index];
     .then((user) => {
       // fail
       if (!user) {
         res.render('pages/error', {
           error: 'No such user',
           title: 'User'
         });
       } else {
         // success;
         console.log(user);
         res.render('pages/user', { user });
       }
     })
     .catch((error) => {
       // error;
       console.log(error);
       res.render('pages/error', {
         error,
         title: 'User'
       });
     });
 });

 // POST new user
 router.post('/', (req, res) => {
   // check user does not already exist in db before inserting
   // usually would access via primary key
   // SELECT
   db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email])
     .then((user) => {
       // If user with that email already exists, render error
       if (user) {
         res.render('pages/error', {
           error: 'User already exists, please use another email address',
           title: 'Invalid User'
         });
         // Otherwise create new user
       } else {
         // Encrypt the password with bcryptJS
         let salt = bcrypt.genSaltSync(10);
         let hash = bcrypt.hashSync(req.body.password, salt);
         // Insert into DB
         db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', [
           req.body.firstname,
           req.body.lastname,
           req.body.email,
           hash
         ])
           .then(() => {
             res.redirect('/users/add')
           })
           .catch((error) => {
             // error;
             res.render('pages/error', {
               error: 'User cannot be added',
               title: 'User'
             });
           });
       }
     })
     .catch((error) => {
       // error;
       console.log(error);
       res.render('pages/error', {
         error,
         title: 'User'
       });
     });
 });

 module.exports = router