var system = require('system');
var shell = require('ringo/shell');
var strings = require('ringo/utils/strings');
var jedis = require('../lib/jedis');

if (system.args.length === 1) {
    var username = shell.readln('Username: ');
    var password = strings.digest(shell.readln('Password: ', '*'), 'sha1');
    var result = jedis.set(username, password);
    if (result == 'OK') {
        console.log('New user '+username+' added to db');
    }
}
