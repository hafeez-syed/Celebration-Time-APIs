/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { registerMember } from '../db/tables/members';
import { queryDatabase } from '../db/mysql-connection';
import MemberModel from '../models/member';
import jwt from '../services/token';

function getAllMembers(req, res) {
    const query = "SELECT * FROM members";

    queryDatabase(query, function (results) {
        if (results.success) {
            const rows = [];
            const result = results.success.result;
            for (const row in result) {
                rows.push(result[row]);
            }
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
        const data = req.body;
        const member = new MemberModel(data);
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
    const body = req.body;
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

export {
    getAllMembers,
    addMember,
    loginMember,
    logoutMember
};
