#!/usr/bin/env ringo

var routes = require("./routes.js");
var {Application} = require('stick');

// create a new ringo/stick app
var app = exports.app = new Application();

// add some middlewares to our Stick app
app.configure(
    // !!! ORDER MATTERS HERE
    // 'cookies' will be the first middleware to process the request, then "session", etc.
    'cookies',
    'session',
    require('./middleware/sessionware'),
    require('./middleware/errorware'),
    require('./middleware/authware'),
    'params',
    'route',
    'static',
    'notfound'
);

// configure authware
app.authware('/save', '/edit', '/delete', '/add');

// configure routes
app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/add', routes.add);
app.get('/delete/:id?', routes.delete);
app.get('/edit/:id?', routes.edit);
app.get('/signout', routes.signout);
app.post('/auth', routes.auth);
app.post('/save', routes.save);
// configure static folder
app.static(module.resolve('./public'), 'index.html');
// configure default NotFound page
app.notfound.template = module.resolve('./templates/404.html');

// main script to start application
if (require.main == module) {
  require("ringo/httpserver").main(module.id);
}
