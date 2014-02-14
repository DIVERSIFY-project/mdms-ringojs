var jedis = require('../jedis');

exports.middleware = function errorware(next, app) {

    return function(req) {
        var errorID = 'error_'+req.cookies['JSESSIONID'];
        if (jedis.exists(errorID)) {
            var rawError = jedis.hmget(errorID, 'type', 'message');
            req.session.volatile = {
                type: rawError.get(0),
                message: rawError.get(1)
            }
            jedis['del(java.lang.String[])'](errorID);
        }
        return next(req);
    }
}