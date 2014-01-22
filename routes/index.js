var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var markdown = require('ringo/markdown');
var sqlite = require('ctlr-sqlite');

module.exports = function (req) {
  var template = getResource("./../templates/index.html").content;

  sqlite.connect('./mdms.db');
  var results = sqlite.get_all('SELECT * FROM article;');
  sqlite.close();
  var articles = [];
  for (var i in results) {
    articles.push({
      id: results[i].id,
      title: results[i].title,
      content: markdown.process(results[i].content),
      date: new Date(results[i].date).toUTCString()
    });
  }
  
  return response.html(
    mustache.to_html(template, {
      title: "MdMS RingoJS",
      articles: articles,
      user: (req.session.data.user) ? req.session.data.user.login : null,
      volatile: req.session.volatile
    })
  );
};