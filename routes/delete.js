var response = require('ringo/jsgi/response');
var jedis = require('../jedis');

module.exports = function (req, id) {
    if (jedis.exists(id)) {
        req.session.volatile = {
            type: 'success',
            message: 'Article "'+id+'" deleted successfully'
        };
        
        jedis.srem('articles', id);
        jedis['del(java.lang.String[])'](id);
        
    } else {
        req.session.volatile = {
            type: 'warning',
            message: 'Article "'+id+'" does not exist (can\'t delete something that does not exist :O)'
        };
    }

    return response.redirect('/');
}