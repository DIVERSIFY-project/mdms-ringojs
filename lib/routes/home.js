var response = require('ringo/jsgi/response');
var { Reinhardt } = require('reinhardt');
var markdown = require('ringo-markdown');
var jedis = require('../jedis');

var reinhardt = new Reinhardt({
  loader: module.resolve('../../templates/')
});

module.exports = function (req) {
    //var template = getResource("./../templates/index.html").content;

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

    return reinhardt.renderResponse('index.html', {
        title: "MdMS RingoJS",
        articles: articles,
        user: (req.session.data.user) ? req.session.data.user.login : null,
        error: errorObj
    });
};
