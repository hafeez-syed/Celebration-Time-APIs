/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { queryDatabase } from '../mysql-connection';

const rosterTable = [
    'roster_name',
    'roster_startdate',
    'roster_period_days',
    'roster_recurring_period'
],
    requestAndResponse = {
        "name": "Farewell Party",
        "period_days": 7,
        "recurring_period": 2,
        "start_date": "",
    },
    table_name = 'rosters';

function addRoster(data, req, res) {
    let query = '';
    query = "SELECT * FROM " + table_name + " WHERE member_email='" + data.email + "'";

    queryDatabase(query, function (result) {
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
                proceedToAdd(function (result) {
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

    function proceedToAdd(cb) {
        query = "INSERT INTO " + table_name;
        query += "(" + rosterTable + ")";
        query += " VALUES (";
        query += "'" + data.name + "', ";
        query += "'" + data.start_date + "', ";
        query += data.period_days.salary + ", ";
        query += data.recurring_period.salary;
        query += ")";

        queryDatabase(query, function (result) {
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

export { addRoster };
