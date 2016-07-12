var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var viewBooks = require('marko').load(require.resolve('./view_books.marko'));
var addBook = require('marko').load(require.resolve('./add_book.marko'));
var addReviews = require('marko').load(require.resolve('./add_reviews.marko'));
var viewReviews = require('marko').load(require.resolve('./view_reviews.marko'));
var search_books = require('marko').load(require.resolve('./search_books.marko'));

router.route('/')
	// GET /doctors
	.get(function(req, res, next){
		mongoose.model('Books').find({}, function(err, books){
			if(err){
				return console.error(err);
			}
			else{
				var userRating = userAvgRating(err, books);
				viewBooks.render({
		            name: 'Books List',
		            booksData: books,
		            userRating: userRating
		        }, res);
			}
		});

		function userAvgRating(err, book){
			var ratings = [];
			for(var i=0; i<book.length; i++)
			{
				if(book[i]['reviews'] != "")
				{
					var reviews = book[i]['reviews'];
					var userRating = 0;
					for(var j=0; j<reviews.length;j++)
					{
						userRating = userRating + parseInt(reviews[j]['rating']);
					}
					userRating = (userRating/parseInt(book[i]['reviews'].length));
					ratings.push(userRating);
				}
				else{
					ratings.push("No Reviews");
				}
				
			}
			return ratings;
		}
	})

router.route('/addBook')
	// GET /doctors
	.get(function(req, res, next){
		var booksData;
		mongoose.model('Books').find({}, function(err, books){
			if(err){
				return console.error(err);
			}
			else{
				addBook.render({
		            name: 'Books List',
		            booksData: books
		        }, res);
			}
		});
	})
	// POST /doctors
	.post(function(req, res){
		var title = req.body.title;
		var author = req.body.author;
		var isbn = req.body.isbn;
		var price = req.body.price;
		var reviews_list = "";//req.body.reviews;
		//var avgrating = req.body.avgrating;
		//console.log(req);
		//console.log(reviews_list);
		mongoose.model('Books').create({
			title: title,
			author: author,
			isbn: isbn,
			price: price
		}, function(err, book){
			if(err){
				res.send("There was an error when adding the information to the database!");
			}
			else{
				console.log(reviews_list.length);
				for (var i = 0; i< reviews_list.length; i++) {
					book.reviews.push(reviews_list[i]);
					console.log(reviews_list[i]);
				};
				book.save(function (err) {
	  				if (!err){ 
						
						res.redirect("/");
						console.log("Record Added");

					} else{
						res.send("There was an error when adding the patient information to the database!");
					}
				});
			}
		})
	})

router.route('/addreviews/:id')
	// GET /doctors
	.get(function(req, res, next){
		var booksData;
		mongoose.model('Books').find({}, function(err, books){
			if(err){
				return console.error(err);
			}
			else{
				addReviews.render({
		            name: 'Books Reviews'
		        }, res);
			}
		});
	})
	// POST /doctors
	.post(function(req, res){
		var bookid = req.params.id;
		var name = req.body.name;
		var comment = req.body.comment;
		var rating = req.body.rating;
		console.log(req.body);

		mongoose.model('Books').findById(req.params.id, function(err, book){
			if(err){
				res.status = 200
				res.format({
					json: function(){
						res.json({"Message": "Book not found"});
					}
				})
			}
			else{
				
				book.reviews.push({reviewername: name,comment: comment, rating: rating});
				
				//var userRating = 0;
				//for (var i=0; i<book.reviews.length;i++)
				//{
					//userRating = userRating + parseInt(book.reviews[i].rating);
				//}
				//userRating = (userRating/parseInt(book.reviews.length));
				//book.avgrating = userRating;
				//console.log("Avg Rating" + userRating);
				book.save(function (err) {
	  				if (!err){ 
						res.redirect("/");
						console.log("Reviews Count" + book.reviews.length);
					} else{
						res.send("There was an error when adding the patient information to the database!");
					}
				});
			}
		})
	});

router.route('/viewreviews/:id')
// GET /doctors
	.get(function(req, res, next){
		var booksData;
		mongoose.model('Books').findById(req.params.id, function(err, book){
			if(err){
				return console.error(err);
			}
			else{
				viewReviews.render({
		            id: req.params.id,
		            title: book.title,
		            reviews: book.reviews
		        }, res);
			}
		});
	})

router.route('/delete/:id')
	.get(function(req, res){
		mongoose.model('Books').findById(req.params.id, function(err, book){
			console.log("Get Method called");
			if(err){
				res.status = 200
				res.format({
					json: function(){
						res.json({"Message": "Book not found"});
					}
				})
			}
			else{
				res.format({
					json: function(){
						res.json(book);
					}
				})
			}
		})
	})
	.post(function(req, res){
		mongoose.model('Books').findById(req.params.id, function(err, book){
			console.log("Delete Method called");
			if(err){
				res.status = 200
				res.format({
					json: function(){
						res.json({"Message": "Book not found"});
					}
				})
			}
			else{
				book.remove(function(err, book){
					if(err){
						res.status = 200
						res.format({
							json: function(){
								res.json({"Message": "Error removing book"});
							}
						})
					}
					else{
						res.redirect("/");
						console.log({"Message": "book deleted"})
					}
				})
			}
		})
	});

router.route('/updateBook/:id')
	.get(function(req, res, next){
		mongoose.model('Books').findById(req.params.id, function(err, book){
			if(err){
				return console.error(err);
			}
			else{
				console.log("Get Data" + book);
				addBook.render({
		            flag: 'update',
		            id: req.params.id,
		            title: book.title,
		            author: book.author,
		            isbn: book.isbn,
		            price: book.price
		        }, res);
			}
		});
	})
	.post(function(req, res){
		var title = req.body.title;
		var author = req.body.author;
		var isbn = req.body.isbn;
		var price = req.body.price;
		console.log("Request Params Data" + req.params.id);
		mongoose.model('Books').findById(req.params.id, function(err, book){
			console.log("====================================================================");
			console.log("Post Data" + book);
			if(err){
				res.status = 200
				res.format({
					json: function(){
						res.json({"Message": "Book not found"});
					}
				})
			}
			else{
				book.title = title;
				book.author = author;
				book.isbn = isbn;
				book.price = price;

				book.save(function(err){
					if(err){
						res.send("There was an error when adding the information to the database!");
					}
					else{
						res.redirect("/");
					}
				})
			}
		})
	})

router.route('/search')
	.get(function(req, res, next){
			mongoose.model('Books').find({}).sort('price').exec(function(err, books){
				if(err){
					return console.error(err);
				}
				else{
					search_books.render({
			            booksData: books
			        }, res);
				}
			});
		})
	.post(function(req, res){
		var searchQuery = req.body.searchText;
		var searchCriteria = req.body.searchCriteria;
		if(searchCriteria == 'title')
		{
			mongoose.model('Books').find({'title' : searchQuery}, function(err, book){
				searchResults(book, err);
			});
		}
		else if(searchCriteria == 'author')
		{
			mongoose.model('Books').find({'author' : searchQuery}, function(err, book){
				searchResults(book, err);
			});
		}
		else if(searchCriteria == 'isbn')
		{
			mongoose.model('Books').find({'isbn' : searchQuery}, function(err, book){
				searchResults(book, err);
			});
		}
		else if(searchCriteria == 'price')
		{
			mongoose.model('Books').find({'price' : searchQuery}, function(err, book){
				searchResults(book, err);
			});
		}
		else if(searchCriteria == 'avgrating')
		{
			mongoose.model('Books').find('reviews', function(err, book){
				searchByRating(err, book)
			});
		}

		function searchByRating(err, book){
			for(var i=0; i<book.length; i++)
			{
				if(book[i]['reviews'] != "")
				{
					var reviews = book[i]['reviews'];
					var userRating = 0;
					for(var j=0; j<reviews.length;j++)
					{
						userRating = userRating + parseInt(reviews[j]['rating']);
					}
					userRating = (userRating/parseInt(book[i]['reviews'].length));
					searchResults(book[i], err);
				}		
			}
		}

		function userAvgRating(err, book){
			var ratings = [];
			for(var i=0; i<book.length; i++)
			{
				if(book[i]['reviews'] != "")
				{
					var reviews = book[i]['reviews'];
					var userRating = 0;
					for(var j=0; j<reviews.length;j++)
					{
						userRating = userRating + parseInt(reviews[j]['rating']);
					}
					userRating = (userRating/parseInt(book[i]['reviews'].length));
					ratings.push(userRating);
				}
				else{
					ratings.push("No Reviews");
				}
				
			}
			return ratings;
		}

		function searchResults(book, err){
			if(err){
				res.status = 200
				res.format({
					json: function(){
						res.json({"Message": "Book not found"});
					}
				})
			}
			else{
				//console.log(book);
				var userRating = userAvgRating(err, book);
				search_books.render({
		            searchData: book,
		            userRating: userRating
		        }, res);
			}
		}
		
	})

module.exports = router;
