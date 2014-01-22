var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var sqlite = require('ctlr-sqlite');

module.exports = function (req, id) {
  var template = getResource("./../templates/edit.html").content;

  if (!isNaN(id)) {
    sqlite.connect('./mdms.db');
    var results = sqlite.get_all("SELECT * FROM article WHERE id="+id);
    sqlite.close();
    var article = results[0];

    if (article) {
      article.date = new Date(article.date).toUTCString();
      return response.html(
        mustache.to_html(template, {
          title: "MdMS RingoJS",
          article: article
        })
      );
    } else {
      return response.redirect('index');
    }
  } else {
    return response.redirect('index');
  }
};