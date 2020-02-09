var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

const commonRouter = require('dg-metadata-app/common-module/common.controller');
const roleRouter = require('dg-metadata-app/roles-module/roles.controller');
const metadataRouter = require('dg-metadata-app/metadata-module/metadata.controller.js');
const metaLocationRouter = require('dg-metadata-app/meta-location-module/meta-location.controller');
const filterRouter = require('dg-metadata-app/filter-module/filter.controller.js');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/common', commonRouter);
app.use('/location', metaLocationRouter);
app.use('/role', roleRouter);
app.use('/filter', filterRouter);
app.use('/', metadataRouter);

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
	// res.render('error');
});

module.exports = app;
