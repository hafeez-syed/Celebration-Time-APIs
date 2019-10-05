/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import jwToken from '../services/token';

dotenv.config();

const environment = process.env.DEFAULT_ENV,
    host = environment ? process.env[`${environment}_SERVER`] : 'localhost',
    port = environment ? process.env[`${environment}_SERVER_PORT`] : 3000,
    app = express(),
    router = express.Router(),
    ip = 'localhost';

app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

http.createServer(app).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');
