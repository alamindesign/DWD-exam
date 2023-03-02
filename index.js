const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Connect to MongoDB database
const url = 'mongodb://localhost:27017/EmployeeDB';
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB');

  // Set up Express.js server
  app.listen(3000, function() {
    console.log('the server running http://localhost:3000');
  });
});

// Retrieve data from MongoDB and render it in a table
app.get('/', function(req, res) {
  const db = client.db('EmployeeDB');
  const collection = db.collection('Employee');
  collection.find({}).toArray(function(err, data) {
    if (err) throw err;
    res.render('index', { data: data });
  });
});
