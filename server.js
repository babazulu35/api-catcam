/* ---------------------------------------------------------------
console.log('May Node be with you yada mina koim ')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

var db
//MongoClient.connect('mongodb://cat:abc123@localhost:27017/catcam', (err, database) => {
MongoClient.connect('mongodb://ayhan:123456@ds025429.mlab.com:25429/nodejwt', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


//app.listen(3000, function() {
  //  console.log('listening on 3000')
  //})

//app.get('/', (req, res) => {
  //  res.send('hello world')
 // })

 // app.get('/', (req, res) => {
   // res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  //})

  //app.post('/quotes', (req, res) => {
    //console.log('Hellooooooooooooooooo!')
 // })

  //app.post('/quotes', (req, res) => {
    //console.log(req.body)
 // })

  app.post('/quotes', (req, res) => {
   db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })

  


  app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
-------------------------------------------------------------------
*/

var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/catcam'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


// START THE SERVER
// =============================================================================
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

  

  

  