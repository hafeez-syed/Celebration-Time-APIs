/**
 * Created by Hafeez Syed on 5/10/2016.
 */
require('dotenv').config();
const mysql = require('mysql'),
	environment = process.env['DEFAULT_ENV'],
	dbConfig = {
		connectionLimit: 100,
		host: environment ? process.env[`${environment}_SERVER`] : 'localhost',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env[process.env.DB_CURRENT],
		debug: false
	};

mysql_connection_pool = mysql.createPool(dbConfig);

function query_database(query, callback) {
	mysql_connection_pool.getConnection(function (error, connection) {
		if (error) {
			var data = {};
			data.error = error;
			data.message = "Error in connection database";
			data.code = 100;
			callback(data);
			return;
		}

		connection.query(query, function (err, rows) {
			connection.release();
			if (!err) {
				var data = {};
				var success = {};
				success.message = 'success';
				success.result = rows;
				data.success = success;
				callback(data);
			}
		});

		connection.on('error', function (err) {
			if (err) {
				var data = {};
				data.error = err;
				data.message = "Error in connection database";
				data.code = 100;
				callback(data);
				return;
			}
		});
	});
}

module.exports = query_database;