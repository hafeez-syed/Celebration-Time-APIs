/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import memberController from '../controllers/members';
import authenticate from '../services/authenticate';

function customers(router) {
	router.route('/api/members')
		.get(memberController().getAllMembers)

	router.route('/api/members/login')
		.post(authenticate, memberController().loginMember);

	router.route('/api/members/logout')
		.post(memberController().logoutMember);

	router.route('/api/members/register')
		.post(memberController().addMember);

	return router;
}

module.exports = customers;