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

    var errorID = 'error_'+req.cookies['SESSID'];
    var errorObj = null;
    if (jedis.exists(errorID)) {
        var rawError = jedis.hmget(errorID, 'type', 'message');
        errorObj = {
            type: rawError.get(0),
            message: rawError.get(1)
        }
        jedis['del(java.lang.String[])'](errorID);
    }
    
    return response.html(
        mustache.to_html(template, {
            title: "MdMS RingoJS",
            articles: articles,
            user: (req.session.data.user) ? req.session.data.user.login : null,
            error: errorObj
        })
    );
};