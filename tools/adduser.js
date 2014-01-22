var sqlite = require('ctlr-sqlite');
var conn = sqlite.connect('./mdms.db');
var system = require('system');
var shell = require('ringo/shell');
var strings = require('ringo/utils/strings');

if (sqlite && conn) {
  if (system.args.length === 1) {
    var username = shell.readln('Username: ');
    var password = strings.digest(shell.readln('Password: ', '*'), 'sha1');
    sqlite.prepared_query("INSERT OR REPLACE INTO user VALUES(?, ?)", [username, password]);
    
    console.log('SQLite db\nUser table:');
    var users = sqlite.get_all('SELECT * FROM user;');
    for (var i in users) {
      console.log(users[i].login, users[i].password);
    }
  }
  
} else {
  console.log('Unable to connect to SQLite db :/');
}