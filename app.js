const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const pageControllers = require('./controllers/pageControllers')
const postControllers = require('./controllers/postControllers')

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
app.use(methodOverride('_method', {
  methods:['POST','GET']
}));

// Routes
app.get('/', postControllers.getAllPosts);

app.get('/posts/:id', postControllers.getOnePost);

app.get('/about', pageControllers.getAboutPage);

app.get('/add', pageControllers.getAddPage);

app.post('/posts', postControllers.postCreater);

app.get('/posts/edit/:id', pageControllers.getEditPage);

app.put('/posts/:id', postControllers.updatePost);

app.delete('/posts/:id', postControllers.deletePost);

app.listen(port, () => {
  console.log('Sunucu başlatıldı...');
});