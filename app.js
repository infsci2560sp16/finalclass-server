/**  
 * Module dependencies.  
 */
var express = require('express');
var connect = require('connect');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// Configuration
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));
//app.use(connect.logger('dev'));
app.use(logger('dev'));
//app.use(connect.json());
//app.use(connect.urlencoded());
app.use(bodyParser.urlencoded({
      extended: true
  }));
app.use(bodyParser.json());
// Routes  

require('./routes/routes.js')(app);

app.listen(port);

console.log('The App runs on port ' + port);