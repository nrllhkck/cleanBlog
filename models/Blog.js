const mongoose = require('mongoose'); // veritabanı bağlantısı için mongoose çağırdık.
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;