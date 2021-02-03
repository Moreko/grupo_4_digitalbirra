// Modulos externos
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override')
var cors = require('cors')
require('dotenv').config()


// Modulos propios
const logAppMw = require("./src/middleware/aplicacion/logAppMw")
const serAdminMw = require("./src/middleware/aplicacion/serAdminMw")


// Routers
var indexRouter = require('./src/routes/indexRouter');
let preindexRouter = require('./src/routes/preindexRouter');
let productsRouter = require('./src/routes/productsRouter');
let usersRouter = require('./src/routes/usersRouter');

let apiBirraRouter = require('./src/routes/api/birra')
let apiUsersRouter = require('./src/routes/api/user')


var app = express();


// view engine setup
app.set('views', [path.join(__dirname, 'src/views'), path.join(__dirname, 'src/views/users'), path.join(__dirname, 'src/views/products')]);

app.set('view engine', 'ejs');

// Middlewares nivel aplicación
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'Secreto empresarial de Digital Birra',
    resave: false,
    saveUninitialized: true,
}))
app.use(cors())

// Mis Middlewares propios
app.use(logAppMw)
app.use(serAdminMw)


app.use('/', indexRouter);
app.use('/preindex', preindexRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/api/birras', apiBirraRouter)
app.use('/api/users', apiUsersRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;