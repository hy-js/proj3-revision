const express = require('express')

const app = express();
const port = process.env.PORT || 3001

// Import libraries + Data
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const path = require('path')

const { users } = require('./data/data.js')

// Middleware
app.use(morgan('dev'))
// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTE
// GET home page
app.get('/', (req, res) => {
   res.send('Welcome to our schedule website')
})

// GET all users
app.get('/users', (req, res) => {
   res.json(users)
})

// GET user form
app.get('/users/add', (req, res) => {
   res.send('Here is where I will add a form')
})

// GET specific users
app.get('/users/:user_id', (req, res) => {
   const index = req.params.user_id
   const result = users[index]

   // validation to confirm number has been entered

   if (index >= users.length){
      res.status(400).send(`msg: User ${index} is not found`)
   }
   res.json(result)
})


// POST new user
app.post('/users', (req, res) => {
   // Destructure variables for a user
   const { firstname, lastname, email, password} = req.body
   // TODO: encrypt the password with bcryptJS
   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(password, salt);
   // Store hash in your password DB.
   // Create new user
   const newUser = {
      firstname: firstname,
     lastname: lastname,
     email: email,
     password: hash
   }


   // Push newUser to data array and send back newUser
   users.push(newUser)
   res.json(newUser)
})

app.listen(port, () => {
   console.log(`Example app listening on http://localhost:${port}`)
})
