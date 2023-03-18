const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()

const server = express()

// DB Model
const models = require('./models/index.js');

// Middleware Plugins
server.use(bodyParser.json())
server.use(express.static('public')) // Just for testing, use a static html


server.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'http://127.0.0.1:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Routes
server.use('/', [
  require('./controllers/file-controller')
])

models.sequelize
	.sync()
	.then(() => console.log('Database connected!'))
	.catch(err => console.error(err, "Something went wrong, database is not connected!"));

// Start the server
  server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
});
