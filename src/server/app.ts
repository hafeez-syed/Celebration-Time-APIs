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

const env = process.env;
const environment = env.DEFAULT_ENV;
const host: string = env[`${environment}_SERVER`] || 'localhost';
const port: number = Number(env[`${environment}_SERVER_PORT`]) || 3000;
const app = express();
const router = express.Router();

const unprotectedPath = [
    '/',
    '/api/customers/login',
    '/api/customers/register',
    '/api/members/login'
];

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(jwToken.jwtExpress.unless({ path: unprotectedPath }));

require('../routes/main')(app, router);

function startServer() {
    http.createServer(app).listen(port);
    console.log('Server running at http://' + host + ':' + port + '/');
}

export default startServer;
