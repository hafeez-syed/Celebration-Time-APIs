/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { addEvent, viewEvents } from '../db/tables/events';
import CustomerModel from '../models/customer';
import EventModel from '../models/event';
import jwt from '../services/token';
import { queryDatabase } from '../db/mysql-connection';
import { registerCustomer } from '../db/tables/customer';


function viewEvent(req, res) {
    viewEvents(req, res);
}

function getAllCustomers(req, res) {
    const query = "SELECT * FROM customers";

    queryDatabase(query, function (results) {
        if (results.success) {
            const rows = [];
            const result = results.success.result;
            for (const row in result) {
                rows.push(result[row]);
            }
            res
                .status(200)
                .json({ status: 200, message: 'SUCCESS!', customers: rows });
        }
    });
}


function addCustomer(req, res) {
    if (!req.body) {
        res
            .status(400)
            .json({ status: 400, message: 'No or wrong data received' });
    } else {
        const data = req.body;
        const customer = new CustomerModel(data);
        if (customer.length) {
            res
                .status(400)
                .json({ status: 400, message: 'Following customer data required ---->>>>> ' + customer });
        } else {
            registerCustomer(data, req, res);
        }
    }

}


function loginCustomer(req, res) {
    const body = req.body;
    jwt.setToken(body.email);

    res.json({
        token: jwt.getToken(),
        customer: { userId: res.locals.userId, email: body.email },
        status: 200,
        message: 'Logged-in Successfully!'
    });
}


function logoutCustomer(req, res) {
    jwt.clearToken();

    res
        .status(200)
        .json({ status: 200, message: 'Logged-out Successfully!' });
}


function addEvent(req, res) {
    if (!req.body) {
        res
            .status(400)
            .json({ status: 400, message: 'No or wrong data received' });
    } else {
        const data = req.body;
        const event = new EventModel(data);

        if (event.length) {
            res
                .status(400)
                .json({ status: 400, message: 'Following event data required ---->>>>> ' + event });
        } else {
            addEvent(data, req, res);
        }
    }
}

export {
    addCustomer,
    addEvent,
    getAllCustomers,
    loginCustomer,
    logoutCustomer,
    viewEvent
};
