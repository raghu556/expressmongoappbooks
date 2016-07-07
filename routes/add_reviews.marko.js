function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"><script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script></head><body><div class="container"><h2>Add Reviews</h2><form method="post" enctype="application/x-www-form-urlencoded" action><fieldset class="form-group"><label for="booktitle">Name</label><input type="text" class="form-control" name="name" id="name" placeholder="Enter Name"></fieldset><fieldset class="form-group"><label for="author">Comment</label><input type="text" class="form-control" id="comment" name="comment" placeholder="Enter Comment"></fieldset><fieldset class="form-group"><label for="isbn">Rating</label><input type="text" class="form-control" id="rating" name="rating" placeholder="Enter Book Rating"></fieldset><button type="submit" class="btn btn-primary">Submit</button></form></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);