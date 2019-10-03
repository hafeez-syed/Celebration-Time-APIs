/**
 * Created by Hafeez Syed on 5/10/2016.
 */
var memberController = require('../controllers/members')();
var authenticate = require('../services/authenticate');

function customers(router) {
	router.route('/api/members')
		.get(memberController.getAllMembers)

	router.route('/api/members/login')
		.post(authenticate, memberController.loginMember);

	router.route('/api/members/logout')
		.post(memberController.logoutMember);

	router.route('/api/members/register')
		.post(memberController.addMember);

	return router;
}

module.exports = customers;