/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import db_query from '../db/mysql_connection');
import MemberModel from '../models/members');
import memberTable from '../db/tables/member');
import jwt from '../services/token');

const memberController = () => {
	return {
		getAllMembers: getAllMembers,
		addMember: addMember,
		loginMember: loginMember,
		logoutMember: logoutMember
	}

	function getAllMembers(req, res) {
		var query = "SELECT * FROM members";

		db_query(query, function (results) {
			if (results.success) {
				var rows = [];
				var result = results.success.result;
				for (var row in result) {
					rows.push(result[row]);
				};
				res
					.status(200)
					.json({ status: 200, message: 'SUCCESS!', members: rows });
			}
		});
	}


	function addMember(req, res) {
		if (!req.body) {
			res
				.status(400)
				.json({ status: 400, message: 'No or wrong data received' });
		} else {
			var data = req.body;
			var member = new MemberModel(data);
			if (member.length) {
				res
					.status(400)
					.json({ status: 400, message: 'Following member data required ---->>>>> ' + member });
			} else {
				memberTable.registerMember(data, req, res);
			}
		}

	}


	function loginMember(req, res) {
		var body = req.body;
		jwt.setToken(body.email);

		res.json({
			token: jwt.getToken(),
			member: { userId: res.locals.userId, email: body.email, permission: res.locals.permission },
			status: 200,
			message: 'Logged-in Successfully!'
		});
	}


	function logoutMember(req, res) {
		jwt.clearToken();

		res
			.status(200)
			.json({ status: 200, message: 'Logged-out Successfully!' });
	}

}

export default memberController;