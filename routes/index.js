var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var markdown = require('ringo/markdown');
var jedis = require('../jedis');

module.exports = function (req) {
    var template = getResource("./../templates/index.html").content;

    var articlesIDs = jedis.smembers('articles');
    var it = articlesIDs.iterator();
    var articles = [];
    while (it.hasNext()) {
        var artID = it.next();
        var artList = jedis.hmget(artID, 'title', 'content');
        articles.push({
            id: artID,
            title: artList.get(0),
            content: markdown.process(artList.get(1))
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