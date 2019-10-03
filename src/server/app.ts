/**
 * Created by Hafeez Syed on 5/10/2016.
 */
require('dotenv').config();
const express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	http = require('http'),
	jwToken = require('../services/token'),
	environment = process.env['DEFAULT_ENV'],
	host = environment ? process.env[`${environment}_SERVER`] : 'localhost',
	port = environment ? process.env[`${environment}_SERVER_PORT`] : 3000,
	app = express(),
	router = express.Router();

const unprotectedPath = [
	'/',
	'/api/customers/login',
	'/api/customers/register',
	'/api/members/login'
]

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(jwToken.jwtExpress.unless({ path: unprotectedPath }));

require('../routes/main')(app, router);

function serve(host, port) {
	http.createServer(app).listen(port, host);
	console.log('Server running at http://' + host + ':' + port + '/');
}

function startServer() {
	serve(host, port);
}

module.exports = startServer;
