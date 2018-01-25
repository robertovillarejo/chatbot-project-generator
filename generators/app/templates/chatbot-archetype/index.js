var env = require('node-env-file');
var debug = require('debug')('<%= appName %>:main');

env(__dirname + '/.env');

debug('Initializing web server...');
//Init web server
var webserver = require('./web-server/express-server')({
    port: process.env.PORT || 3000
});

<% if(facebookBot){ %>
debug('Initializing Facebook bot...');
//Init facebook bot
require('./facebook/bot')({
    access_token: process.env.ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
    webserver: webserver
});
<% } %>
