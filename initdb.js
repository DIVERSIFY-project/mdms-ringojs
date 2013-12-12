var sqlite = require('ctlr-sqlite');
var conn = sqlite.connect('./mdms.db');

sqlite.query('CREATE TABLE IF NOT EXISTS article(id INTEGER PRIMARY KEY, title TEXT, content TEXT, date INTEGER);', conn);