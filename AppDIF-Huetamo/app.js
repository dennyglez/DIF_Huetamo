var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bcrypt = require('bcrypt');

const session = require('express-session');

  



var indexRouter = require('./routes/index');
var serviciosRouter = require('./routes/servicios');



var app = express();
//middleware de sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Configura express-myconnection con la misma conexión MySQL
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'sergiogamer500',
    port: 3306,
    database: 'nodelogin'
};

const db = mysql.createConnection(dbOptions);

// Intenta conectar a la base de datos
db.connect(function(err) {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Adjunta la conexión a req para que esté disponible en las rutas y controladores
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// Configura bcrypt a req antes de las rutas xd 
app.use(function(req, res, next) {
    req.bcrypt = bcrypt; // Pasa bcrypt a req
    req.db = db;
    next();
});


// Rutas
app.use('/', indexRouter);
app.use('/servicios', serviciosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
