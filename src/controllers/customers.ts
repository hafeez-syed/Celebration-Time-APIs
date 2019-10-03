/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import db_query from '../db/mysql_connection');
import CustomerModel from '../models/customers');
import EventModel from '../models/events');
import customerTable from '../db/tables/customers');
import eventTable from '../db/tables/events');
import jwt from '../services/token');

const customerController = () => {


	return {
		getAllCustomers: getAllCustomers,
		addCustomer: addCustomer,
		loginCustomer: loginCustomer,
		logoutCustomer: logoutCustomer,
		addEvent: addEvent,
		viewEvent: viewEvent

	}

	function viewEvent(req, res) {
		eventTable.viewEvents(req, res);
	}

	function getAllCustomers(req, res) {
		var query = "SELECT * FROM customers";

		db_query(query, function (results) {
			if (results.success) {
				var rows = [];
				var result = results.success.result;
				for (var row in result) {
					rows.push(result[row]);
				};
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
			var data = req.body;
			var customer = new CustomerModel(data);
			if (customer.length) {
				res
					.status(400)
					.json({ status: 400, message: 'Following customer data required ---->>>>> ' + customer });
			} else {
				customerTable.registerCustomer(data, req, res);
			}
		}

	}


	function loginCustomer(req, res) {
		var body = req.body;
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
			var data = req.body;
			var event = new EventModel(data);

			if (event.length) {
				res
					.status(400)
					.json({ status: 400, message: 'Following event data required ---->>>>> ' + event });
			} else {
				eventTable.addEvent(data, req, res);
			}
		}
	}
}

export default customerController;