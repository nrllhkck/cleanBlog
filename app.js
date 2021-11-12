const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Blog = require('./models/Blog');

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
  const blogs = await Blog.find({});
  res.render('index',{blogs});
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/blogs', async (req, res) => { // yeni yazı eklendiğinde gelen veriyi yakalamak için post işlemi yapıyoruz.
  await Blog.create(req.body)
  res.redirect('/')
});

app.listen(port, () => {
  console.log('Sunucu başlatıldı...');
});
