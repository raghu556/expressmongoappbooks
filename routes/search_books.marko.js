function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      forEachWithStatusVar = __helpers.fv,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><script src="/javascripts/jquery.min.js"></script><script src="/javascripts/bootstrap.min.js"></script><style type="text/css">#SeachBySelection li{ display: inline-block; list-style: none; }\n#SeachBySelection li span{ padding: 5px 25px; cursor: pointer; }\n#SeachBySelection li.active span{ background: #ccc;\n}</style><script type="text/javascript">\n\t\t\t$(document).ready(function(){\n\t\t\t\t$("#SeachBySelection li").click(function(){\n\t\t\t\t\t$(this).addClass(\'active\').siblings(\'li\').removeClass();\n\t\t\t\t\tvar outValue = $(this).find(\'span\').data(\'name\');\n\t\t\t\t\t$("#searchCriteria").attr({"value" : outValue});\n\t\t\t\t});\n\t\t\t});\n\t\t</script></head><body><div class="container"><br><ul class="nav nav-pills"><li role="presentation"><a href="/">Back</a></li></ul><hr> <h2 style="text-align: center">Search</h2><form method="post" enctype="application/x-www-form-urlencoded" action="/search"><div class="panel panel-primary"><div id="custom-search-input"><div class="input-group col-md-12"><input type="text" class="form-control input-lg" name="searchText" placeholder="Search Books"><span class="input-group-btn"><button class="btn btn-info btn-lg" type="submit"><i class="glyphicon glyphicon-search"></i></button></span></div></div></div><p>Search</p><input type="hidden" name="searchCriteria" id="searchCriteria" value="title"><ul id="SeachBySelection"><li class="active"><span data-name="title">By Name</span></li><li><span data-name="isbn">By ISBN</span></li><li><span data-name="price">By Price</span></li></ul></form><br><hr>');

    if (notEmpty(data.searchData)) {
      out.w('<div><h2 style="text-align: center">Searched Results</h2>');

      forEachWithStatusVar(data.searchData , function(book,loop) {
        out.w('<div class="panel panel-primary">');

        var index = loop.getIndex();

        out.w('<div class="panel-heading">' +
          escapeXml(book.title) +
          '</div><div class="panel-body"><p> Author: ' +
          escapeXml(book.author) +
          '<br>ISBN : ' +
          escapeXml(book.isbn) +
          '<br>Price: ' +
          escapeXml(book.price) +
          '<br>Average Rating: ' +
          escapeXml(data.userRating[index]) +
          '</p></div></div>');
      });

      out.w('</div>');
    }

    out.w('</div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);