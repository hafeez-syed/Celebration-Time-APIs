/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { queryDatabase } from '../mysql-connection';

const memberTable = [
    'member_name',
    'member_role',
    'member_position',
    'member_salary_per_hour',
    'member_email',
    'member_password',
    'member_phone',
    'member_image',
    'member_street_number',
    'member_street_name',
    'member_suburb',
    'member_postcode',
    'member_state',
    'member_country',
    'member_mobile',
    'member_gender',
    'member_dob'
],
    requestAndResponse = {
        "name": "Hafeez Syed",
        "role": 1,
        "position": "manager",
        "salary": 14.50,
        "email": "feeziman007@hotmail.com",
        "password": "sdfshdf98934534",
        "phone": "0397497876",
        "image": "",
        "street_number": 5,
        "street_name": "Burchelli Way",
        "suburb": "Wyndham Vale",
        "postcode": 3024,
        "state": "VIC",
        "country": "Australia",
        "mobile": "0430048332",
        "gender": "male",
        "dob": "07/07/1980"
    },
    table_name = 'members';

function registerMember(data, req, res) {
    let query = '';
    query = "SELECT * FROM " + table_name + " WHERE member_email='" + data.email + "'";

    db_query(query, function (result) {
        if (result.success) {
            const rows = [];
            const result = result.success.result;
            for (const row in result) {
                rows.push(result[row]);
            }

            if (rows.length) {
                res
                    .status(403)
                    .json({
                        status: 403,
                        message: 'EMAIL ADDRESS EXIST! Try a different one.'
                    });
            } else {
                proceedToRegister(function (result) {
                    res
                        .status(result.status)
                        .json(result);
                });
            }
        } else {
            res
                .status(result.error.code)
                .json({ status: result.error.code, message: 'DATABASE ERROR!', details: result.error });
        }
    });

    function proceedToRegister(cb) {
        query = "INSERT INTO " + table_name;
        query += "(" + memberTable + ")";
        query += " VALUES (";
        query += "'" + data.name + "', ";
        query += data.role + ", ";
        query += "'" + data.position + "', ";
        query += data.salary + ", ";
        query += "'" + data.email + "', ";
        query += "'" + data.password + "', ";
        query += "'" + data.phone + "', ";
        query += "'" + data.image + "', ";
        query += "'" + data.street_number + "', ";
        query += "'" + data.street_name + "', ";
        query += "'" + data.suburb + "', ";
        query += "'" + data.postcode + "', ";
        query += "'" + data.state + "', ";
        query += "'" + data.country + "', ";
        query += "'" + data.mobile + "', ";
        query += "'" + data.gender + "', ";
        query += "'" + data.dob + "'";
        query += ")";

        db_query(query, function (result) {
            let data = {};
            if (result.error) {
                data = { status: result.error.code, message: 'DATABASE ERROR!', details: result.error };
            } else {
                data = { status: 200, message: 'SUCCESS!' };
            }
            cb(data);
        });
    }
}

export { registerMember };
