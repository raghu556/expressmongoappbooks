var mongoose = require('mongoose'); 
var reviewsSchema = new mongoose.Schema({  
  reviewername: String,
  comment: String,
  rating: Number
});

var booksSchema = new mongoose.Schema({  
  title: String,
  author: String,
  isbn: String,
  price: Number,
  avgrating: Number,
  reviews: [reviewsSchema]
});
mongoose.model('Books', booksSchema);