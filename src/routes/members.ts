/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { addMember, getAllMembers, loginMember, logoutMember } from '../controllers/member';
import authenticate from '../services/authenticate';

function customers(router) {
    router.route('/api/members')
        .get(getAllMembers);

    router.route('/api/members/login')
        .post(authenticate, loginMember);

    router.route('/api/members/logout')
        .post(logoutMember);

    router.route('/api/members/register')
        .post(addMember);

    return router;
}

export { customers };
