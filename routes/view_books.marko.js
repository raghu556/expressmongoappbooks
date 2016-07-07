function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      forEach = __helpers.f,
      escapeXml = __helpers.x,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"><script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script></head><body><div class="container"><br><ul class="nav nav-pills"><li role="presentation"><a href="/books/addBook">Add New Book</a></li><li role="presentation"><a href="/books/search">Search Book</a></li></ul><hr> <h2 style="text-align: center">List of Books</h2>');

    forEach(data.booksData, function(book) {
      if (notEmpty(data.booksData)) {
        out.w('<div class="panel panel-primary"><div class="panel-heading">' +
          escapeXml(book.title) +
          '</div><div class="panel-body"><p> Author: ' +
          escapeXml(book.author) +
          '<br>ISBN : ' +
          escapeXml(book.isbn) +
          '<br>Price: ' +
          escapeXml(book.price) +
          '<br>Average :' +
          escapeXml(book.avgrating) +
          '</p><form method="get" style="display:inline-block" enctype="application/x-www-form-urlencoded" action="/books/viewreviews/' +
          escapeXmlAttr(book.id) +
          '"><input type="Submit" value="View Reviews"></form> <form method="get" style="display:inline-block" enctype="application/x-www-form-urlencoded" action="/books/addreviews/' +
          escapeXmlAttr(book.id) +
          '"><input type="Submit" value="Add Review"></form> <form method="get" style="display:inline-block;padding-left:20px;padding-right:20px;" enctype="application/x-www-form-urlencoded" action="/books/updateBook/' +
          escapeXmlAttr(book.id) +
          '"><input type="Submit" value="Update"></form><form method="post" style="display:inline-block;padding-left:20px;padding-right:20px;" enctype="application/x-www-form-urlencoded" action="/books/delete/' +
          escapeXmlAttr(book.id) +
          '"><input type="Submit" value="Delete"></form></div></div>');
      }
    });

    out.w('</div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);