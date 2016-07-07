function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><script src="/javascripts/bootstrap.min.js"></script></head><body><div class="container"><br><ul class="nav nav-pills"><li role="presentation"><a href="/books">Back</a></li></ul><hr> <h2 style="text-align: center">Reviews for ' +
      escapeXml(data.title) +
      '</h2><div class="panel panel-primary">');

    forEach(data.reviews, function(review) {
      out.w('<ul class="list-group"><li class="list-group-item">Reviewer Name: ' +
        escapeXml(review.reviewername) +
        ' <br> Message: ' +
        escapeXml(review.comment) +
        '<br> Rating: ' +
        escapeXml(review.rating) +
        '</li></ul>');
    });

    out.w('</div></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);