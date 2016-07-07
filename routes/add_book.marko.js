function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      attr = __helpers.a;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><script src="/javascripts/bootstrap.min.js"></script></head><body><div class="container"><br><ul class="nav nav-pills"><li role="presentation"><a href="/">View list of Books</a></li></ul><h2 style="text-align: center">' +
      escapeXml(data.name) +
      '</h2><form method="post" enctype="application/x-www-form-urlencoded"' +
      attr("action", data.flag == 'update' ?  ('/updateBook/'+data.id) : '/addBook') +
      '><fieldset class="form-group"><label for="booktitle">Book Title</label><input type="text" class="form-control" name="title" id="title" placeholder="Enter Book Title"' +
      attr("value", data.flag == 'update' ?  data.title : '') +
      '></fieldset><fieldset class="form-group"><label for="author">Author</label><input type="text" class="form-control" id="author" name="author" placeholder="Enter Book Author"' +
      attr("value", data.flag == 'update' ?  data.author : '') +
      '></fieldset><fieldset class="form-group"><label for="isbn">ISBN</label><input type="text" class="form-control" id="isbn" name="isbn" placeholder="Enter Book ISBN"' +
      attr("value", data.flag == 'update' ?  data.isbn : '') +
      '></fieldset><fieldset class="form-group"><label for="price">Price</label><input type="text" class="form-control" id="price" name="price" placeholder="Enter Book Price"' +
      attr("value", data.flag == 'update' ?  data.price : '') +
      '></fieldset><button type="submit" class="btn btn-primary">Submit</button></form></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);