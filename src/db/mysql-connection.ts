/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const env = process.env;
const environment = env.DEFAULT_ENV;
const dbConfig = {
    connectionLimit: 100,
    debug: false,
    database: env[env.DB_CURRENT],
    host: environment ? env[`${environment}_SERVER`] : 'localhost',
    password: env.DB_PASSWORD,
    user: env.DB_USER,
};

const mysqlConnectionPool = mysql.createPool(dbConfig);

const queryDatabase = (query, callback) => {
    mysqlConnectionPool.getConnection(function (error, connection) {
        if (error) {
            const data = {};
            data.error = error;
            data.message = "Error in connection database";
            data.code = 100;
            callback(data);
            return;
        }

        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                const data = {};
                const success = {};
                success.message = 'success';
                success.result = rows;
                data.success = success;
                callback(data);
            }
        });

        connection.on('error', function (err) {
            if (err) {
                const data = {};
                data.error = err;
                data.message = "Error in connection database";
                data.code = 100;
                callback(data);
                return;
            }
        });
    });
};

export { queryDatabase };
