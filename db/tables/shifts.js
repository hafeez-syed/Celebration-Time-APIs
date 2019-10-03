/**
 * Created by Hafeez Syed on 5/10/2016.
 */
var db_query = require('../mysql_connection'),
    shiftTable = [
        'roster_id',
        'shift_starttime',
        'shift_endtime',
        'shift_break_startime',
        'shift_break_endtime',
        'member_id',
        'shift_position'
    ],
    requestAndResponse = {
        "rosterID": 1,
        "starttime": "",
        "endtime": "",
        "break_starttime": "",
        "break_endtime": "",
        "memberID": 3,
        "position": "staff"
    },
    table_name = 'shifts';

function addShift(data, req, res) {
    var query = '';
    query = "SELECT * FROM " + table_name + " WHERE member_email='" + data.email + "'";
    
    db_query(query, function (result) {
        if (result.success) {
            var rows = [];
            var result = result.success.result;
            for (var row in result) {
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
                proceedToAdd(function(result) {
                    res
                        .status(result.status)
                        .json(result);
                });
            }
        } else {
            res
                .status(result.error.code)
                .json({status: result.error.code, message: 'DATABASE ERROR!', details: result.error});
        }
    });
    
    function proceedToAdd(cb) {
        query = "INSERT INTO " + table_name;
        query += "(" + shiftTable + ")";
        query += " VALUES (";
        query += data.rosterID + ", ";
        query += "'" + data.starttime + "', ";
        query += "'" + data.endtime + "', ";
        query += "'" + data.break_starttime + "', ";
        query += "'" + data.break_endtime + "', ";
        query += data.memberID+ ", ";
        query += "'" + data.position + "'";
        query += ")";
        
        db_query(query, function (result) {
            var data = {};
            if (result.error) {
                data = {status: result.error.code, message: 'DATABASE ERROR!', details: result.error};
            } else {
                data = {status: 200, message: 'SUCCESS!'};
            }
            cb(data);
        });
    }
}

module.exports = addShift;