var jedis = require('../jedis');

exports.middleware = function sessionware(next) {

    return function(req) {
        var sessID = req.cookies['JSESSIONID'];
        if (jedis.exists(sessID)) {
            // there is already a session for this ID, renew TTL
            jedis.expire(sessID, 60*30);
            
        } else {
            // this sessionID is not registered in db, do it
            jedis.set(sessID, 'guest_'+(parseInt(Math.random()*100000)));
            jedis.expire(sessID, 60*30);
        }
        return next(req);
    }
}