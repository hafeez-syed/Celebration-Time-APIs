/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import express from 'express';
// const router = express.Router();

function appRoutes(app, router) {

    // Handler for all Unauthorized and non existent URLs
    app.use(function (err, req, res, next) {
        if (401 === err.status) {
            res
                .status(401)
                .json({ status: 401, message: 'Sorry!. You are Unauthorized.' });
        }
    });

    const index = require('./index')(router);
    app.use('/', index);

    const customers = require('./customers')(router);
    app.use('/api/customers/', customers);

    const members = require('./members')(router);
    app.use('/api/members/', members);

}

export default appRoutes;
