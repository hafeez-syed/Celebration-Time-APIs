/**
 * Created by Hafeez on 10/10/2016.
 */
import { queryDatabase } from '../db/mysql-connection';

const authenticate = (req, res, next) => {
    let body = req.body;

    if (!body.type) {
        intruder_detected();
    } else {
        if ((!body.email || !body.password)) {
            res
                .status(400)
                .json({ status: 400, message: 'Must provide email and password' });
        } else {
            if (body.type === 'customers' || body.type === 'members') {
                let db_table = body.type;
                let query = '';
                let uId = "";

                if (db_table === 'customers') {
                    query = "SELECT * FROM " + db_table + " WHERE customer_email = '" + body.email + "' and customer_password = '" + body.password + "'";
                    uId = "customer_id";
                } else {
                    query = "SELECT * FROM " + db_table + " WHERE member_email = '" + body.email + "' and member_password = '" + body.password + "'";
                    uId = "member_id";
                }

                queryDatabase(query, function (result) {
                    if (result.success) {
                        let rows = [];
                        let result = result.success.result;
                        for (let row in result) {
                            res.locals.userId = result[row][uId];
                            if (uId === 'member_id') {
                                res.locals.permission = result[row].member_role === 2 ? 'full' : 'restricted';
                            }
                            rows.push(result[row]);
                        }

                        if (rows.length) {
                            next();
                        } else {
                            res
                                .status(401)
                                .json({ status: 401, message: 'Email or Password doest not match' });
                        }
                    }
                });
            } else {
                intruder_detected(true);
            }
        }
    }

    function intruder_detected(detected) {
        res
            .status(400)
            .json({ status: 400, message: detected ? 'ALERT! Intruder detected.' : 'Who are you? Customer or a Staff?' });
    }
};

export default authenticate;
