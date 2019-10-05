/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { getAllCustomers, loginCustomer, logoutCustomer, addCustomer, addEvent, viewEvent } from '../controllers/customer';
import authenticate from '../services/authenticate';

function customers(router) {
    router.route('/api/customers')
        .get(getAllCustomers);

    router.route('/api/customers/login')
        .post(authenticate, loginCustomer);

    router.route('/api/customers/logout')
        .post(logoutCustomer);

    router.route('/api/customers/register')
        .post(addCustomer);

    router.route('/api/customers/:customerId/events')
        .post(addEvent);

    router.route('/api/customers/:customerId/events/')
        .get(viewEvent);

    router.route('/api/customers/:customerId/events/:eventId')
        .get(viewEvent);

    return router;
}

export default customers;
