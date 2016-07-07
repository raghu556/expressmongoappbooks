var mongoose = require('mongoose');  
var reviewsSchema = new mongoose.Schema({  
  reviewername: String,
  comment: String,
  rating: Number
});
mongoose.model('Reviews', reviewsSchema);