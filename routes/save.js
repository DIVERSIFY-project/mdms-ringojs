var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var sqlite = require('ctlr-sqlite');
sqlite.connect('./mdms.db');

exports.save = function (req) {
  var id      = req.env.servletRequest.getParameter('id'),
      title   = req.env.servletRequest.getParameter('title'),
      content = req.env.servletRequest.getParameter('content');
  var template = getResource("./../templates/edit.html").content;

  if (title && content) {
    var results = sqlite.prepared_query("INSERT OR REPLACE INTO article VALUES(?, ?, ?, ?)", [id, title, content, new Date().getTime()]); // TODO SQL inject and stuff, but that's a POC who cares :D
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