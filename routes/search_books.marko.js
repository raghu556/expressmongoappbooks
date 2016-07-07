function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      forEach = __helpers.f,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><script src="/javascripts/bootstrap.min.js"></script></head><body><div class="container"><br><ul class="nav nav-pills"><li role="presentation"><a href="/books">Back</a></li></ul><hr> <h2 style="text-align: center">Search</h2><form method="post" enctype="application/x-www-form-urlencoded" action="/books/search"><div class="panel panel-primary"><div id="custom-search-input"><div class="input-group col-md-12"><input type="text" class="form-control input-lg" name="searchText" placeholder="Search Books by Name"><span class="input-group-btn"><button class="btn btn-info btn-lg" type="submit"><i class="glyphicon glyphicon-search"></i></button></span></div></div></div></form><br><hr>');

    if (notEmpty(data.searchData)) {
      out.w('<div><h2 style="text-align: center">Searched Results</h2>');

      forEach(data.searchData, function(book) {
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
          '</p></div></div>');
      });

      out.w('</div>');
    }

    out.w('</div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);