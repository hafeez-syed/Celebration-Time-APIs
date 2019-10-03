/**
 * Created by Hafeez on 10/10/2016.
 */
var db_query = require('../db/mysql_connection');

function authenticate(req, res, next) {
    var body = req.body;

    if(!body.type) {
        intruder_detected();
    } else {
        if( (!body.email || !body.password) ) {
            res
                .status(400)
                .json({status: 400, message: 'Must provide email and password'});
        } else {
            if(body.type === 'customers' || body.type === 'members') {
                var db_table = body.type;
                var query = '';
                var uId = "";
                
                if (db_table === 'customers') {
                    query = "SELECT * FROM " + db_table + " WHERE customer_email = '" + body.email + "' and customer_password = '" + body.password + "'";
                    uId = "customer_id";
                } else {
                    query = "SELECT * FROM " + db_table + " WHERE member_email = '" + body.email + "' and member_password = '" + body.password + "'";
                    uId = "member_id";
                }

                db_query(query, function(result) {
                    if (result.success) {
                        var rows = [];
                        var result = result.success.result;
                        for (var row in result) {
                            res.locals.userId = result[row][uId];
                            if(uId === 'member_id') {
                                res.locals.permission = result[row]['member_role'] === 2 ? 'full' : 'restricted';
                            }
                            rows.push(result[row]);
                        }
            
                        if (rows.length) {
                            next();
                        } else {
                            res
                                .status(401)
                                .json({status: 401, message: 'Email or Password doest not match'});
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
            .json({status: 400, message: detected ? 'ALERT! Intruder detected.' : 'Who are you? Customer or a Staff?'});
    }
}

module.exports = authenticate;