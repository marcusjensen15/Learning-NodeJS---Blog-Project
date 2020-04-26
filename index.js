const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
app.set('view engine', 'ejs'); //this is telling express to use ejs as our templating engine. any file ending in .ejs should be rendered with the EJS package
//tells it that all static assets live in the public library
app.use(express.static('public'));
app.listen(4000,() => {
  console.log('app listening on port 4000');
})

app.post('/posts/store', async (req,res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
});

app.get('/', (req,res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
  res.render('index');
});

app.get('/about', (req,res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'));
  res.render('about');
});

app.get('/posts/new', (req,res) => {
  res.render('create');
});

app.get('/contact',(req,res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'));
  res.render('contact');
});

// app.get('/post',(req,res) => {
//   // res.sendFile(path.resolve(__dirname,'pages/post.html'));
//   res.render('post');
// });
