/**
 * Created by Hafeez Syed on 5/10/2016.
 */
var customerController = require('../controllers/customers')();
var authenticate = require('../services/authenticate');

function customers(router) {
	router.route('/api/customers')
		.get(customerController.getAllCustomers);

	router.route('/api/customers/login')
		.post(authenticate, customerController.loginCustomer);
	
	router.route('/api/customers/logout')
		.post(customerController.logoutCustomer);
	
	router.route('/api/customers/register')
		.post(customerController.addCustomer);

	router.route('/api/customers/:customerId/events')
		.post(customerController.addEvent);

	router.route('/api/customers/:customerId/events/')
		.get(customerController.viewEvent);

	router.route('/api/customers/:customerId/events/:eventId')
		.get(customerController.viewEvent);

	return router;
}

module.exports = customers;