/**
 * Created by Hafeez Syed on 5/10/2016.
 */
var db_query = require('../mysql_connection'),
    customerTable = [
        'customer_name',
        'customer_email',
        'customer_password',
        'customer_image',
        'customer_street_number',
        'customer_street_name',
        'customer_suburb',
        'customer_postcode',
        'customer_state',
        'customer_country',
        'customer_mobile',
        'customer_phone',
        'customer_gender',
        'customer_dob'
    ],
    requestAndResponse = {
        "name": "Hafeez Syed",
        "email": "feeziman007@hotmail.com",
        "password": "sdfshdf98934534",
        "street_number": 5,
        "street_name": "Burchelli Way",
        "suburb": "Wyndham Vale",
        "postcode": 3024,
        "state": "VIC",
        "country": "Australia",
        "mobile": "0430048332",
        "phone": "0397497876",
        "gender": "male",
        "dob": "",
        "image": ""
    },
    table_name = 'customers';

function registerCustomer(data, req, res) {
    var query = '';
    query = "SELECT * FROM " + table_name + " WHERE customer_email='" + data.email + "'";

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
                proceedToRegister(function(result) {
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

    function proceedToRegister(cb) {
        query = "INSERT INTO " + table_name;
        query += "(" + customerTable + ")";
        query += " VALUES (";
        query += "'" + data.name + "', ";
        query += "'" + data.email + "', ";
        query += "'" + data.password + "', ";
        query += "'" + data.image + "', ";
        query += "'" + data.street_number + "', ";
        query += "'" + data.street_name + "', ";
        query += "'" + data.suburb + "', ";
        query += "'" + data.postcode + "', ";
        query += "'" + data.state + "', ";
        query += "'" + data.country + "', ";
        query += "'" + data.mobile + "', ";
        query += "'" + data.phone + "', ";
        query += "'" + data.gender + "', ";
        query += "'" + data.dob + "'";
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

function viewCustomerProfile(req, res) {

    if(req.params && req.params.customerId) {
        var custId = req.params.customerId;

        var query = "SELECT * FROM customers WHERE customer_id = " + custId;

        db_query(query, function(results) {
            if(results.success) {
                var result = results.success.result;
                if(result.length) {
                    result = result[0];
                    var customerResult = {
                        cId: result.customer_id,
                        cName: result.customer_name,
                        cEmail: result.customer_email,
                        cPassword: result.customer_password,
                        cImage: result.customer_image,
                        cStreet_number: result.customer_street_number,
                        cStreet_name: result.customer_street_name,
                        cSuburb: result.customer_suburb,
                        cPostcode: result.customer_postcode,
                        cState: result.customer_state,
                        cCountry: result.customer_country,
                        cMobile: result.customer_mobile,
                        cPhone: result.customer_phone,
                        cGender: result.customer_gender,
                        cDob: result.customer_dob
                    };

                    res
                        .status(200)
                        .json({status: 200, message: 'SUCCESS!', customers: customerResult});
                } else {
                    res
                        .status(404)
                        .json({status: 404, message: 'No record found.'});
                }
            } else {
                res
                    .status(results.error.code)
                    .json({status: results.error.code, message: 'DATABASE ERROR!', details: results.error});
            }
        });
    } else {
        res
            .status(400)
            .json({status: 400, message: 'Customer ID required!'});
    }
}



module.exports = {
    registerCustomer: registerCustomer,
    viewCustomerProfile: viewCustomerProfile
};