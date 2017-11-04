const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
// create the app here
let app = express();

// telling hbs where to look for partials
hbs.registerPartials(__dirname + '/views/partials');
// telling express to use hbs as the view engine
app.set('view engine', 'hbs');

// middle ware to set up a logger
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
});

// app.use is our middleware call. Things happen in order
// that they are written.
// app.use(( req, res, next) => {
//   res.render('maintenance.hbs');
// });
// middleware to tell express to use this static directory.
app.use(express.static(__dirname + '/public'));

// helper that we can use in our hbs files
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// route to tell the express server how to respond.
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome To MY SHIT MUTHA FUCKAAA',
    welcomeMessage: 'WUBBA LUBBA DUB DUB!!!'
  });
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Sorry this request couldnt be completed.'
  });
});

// start the server to listen for requests.
app.listen(port, () => {
  console.log('Server is up and running on localhost:3000');
});
