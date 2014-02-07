var response = require('ringo/jsgi/response');
var jedis = require('../jedis');
var strings = require('ringo/utils/strings');

module.exports = function (req) {
    console.dir(req);
    var id      = req.postParams['id'],
        title   = req.postParams['title'],
        content = req.postParams['content'];
    
    if (title.length === 0 || content.length === 0) {
        req.session.volatile = {
            type: 'warning',
            message: 'Article "'+id+'" does not exist or "title" and/or "content" were empty'
        };
        return response.ok();

    } else {
        if (id && jedis.exists(id)) {
            // update in db
            var map = Packages.java.util.HashMap();
            map.put('title', title);
            map.put('content', content);
            jedis.hmset(id, map);
            return response.ok();
            
        } else {
            // add in db
            var map = Packages.java.util.HashMap();
            id = strings.digest(new Date().getTime().toString(), 'sha1');
            map.put('title', title);
            map.put('content', content);
            jedis.hmset(id, map);
            jedis.sadd('articles', id);
            return response.ok();
        }
    }
};