var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var sqlite = require('ctlr-sqlite');
sqlite.connect('./mdms.db');

exports.edit = function (req) {
  var id = req.env.servletRequest.getParameter('id');
  var template = getResource("./../templates/edit.html").content;

  if (!isNaN(id)) {
    var results = sqlite.get_all("SELECT * FROM article WHERE id="+id);
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
  }
};