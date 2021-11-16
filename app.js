const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Post = require('./models/Post');

const port = 5000;

// connect mongoDB
mongoose.connect('mongodb://localhost/clean-blog-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index',{posts});
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/posts', async (req, res) => { // yeni yazı eklendiğinde gelen veriyi yakalamak için post işlemi yapıyoruz.
  await Post.create(req.body)
  res.redirect('/')
});

app.listen(port, () => {
  console.log('Sunucu başlatıldı...');
});