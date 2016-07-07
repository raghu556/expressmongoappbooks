function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Time</title></head><body>' +
      escapeXml(data.name));

    if (notEmpty(data.books)) {
      out.w('<ul>');

      forEach(data.books, function(book) {
        out.w('<li>' +
          escapeXml(book) +
          '</li>');
      });

      out.w('</ul>');
    }

    out.w('</body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);