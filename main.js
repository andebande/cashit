var express = require('express');
var app = express();
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true 
}));
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/assets/img/favicon.png'));
app.use(express.static(path.join(__dirname, 'public')));
var session = require('express-session');
app.use(session({
    secret: 'CashIT',
    saveUninitialized: true,
    resave: true
}));
var events = require('events');
var EventEmitter = new events.EventEmitter();

require('./routes/index')(app, EventEmitter);

app.listen(8080);
console.log("Server running at http://localhost:8080/");
