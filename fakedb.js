var sqlite = require('ctlr-sqlite');
var conn = sqlite.connect('./mdms.db');

sqlite.query('INSERT INTO article VALUES (?, "Article 1", "__foo__  \nbar  \n[Google.fr](http://google.fr)", '+(new Date().getTime())+')', conn);
sqlite.query('INSERT INTO article VALUES (?, "Article 2", "*potato* lorem ipsum dolor\n\n  * sit\n  * amet", '+(new Date().getTime())+')', conn);
sqlite.query('INSERT INTO article VALUES (?, "Article 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus ut elit gravida eleifend. Cras id diam nec sem pretium eleifend. Praesent rutrum rutrum porttitor. Etiam commodo vel risus et dapibus. Cras id scelerisque tellus, non auctor sem. Quisque et urna bibendum, condimentum dolor et, condimentum neque. Vivamus iaculis massa faucibus scelerisque mollis. Fusce lacinia nisl velit, quis rutrum velit suscipit facilisis. Suspendisse ultrices dignissim libero, lobortis dictum tellus suscipit scelerisque.", '+(new Date().getTime())+')', conn);