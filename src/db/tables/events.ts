/**
 * Created by Hafeez Syed on 5/10/2016.
 */
import { queryDatabase } from '../mysql-connection';

const moment = require('moment'),
    eventTable = [
        'event_title',
        'customer_id',
        'event_location',
        'event_starts',
        'event_ends',
        'event_rsvp',
        'event_created',
        'event_image',
        'event_lat',
        'event_long'
    ],
    requestValuesSample = {
        "title": "Birthday Party",
        "customer_id": 3,
        "location": "5 Burchelli Way, Wynhdam Vale 3024, Victoria, Australia",
        "starts": "2015-11-02 19:00:00",
        "ends": "2015-11-02 23:45:00",
        "rsvp": "2015-11-01",
        "created": "2015-10-02 23:00:00",
        "image": "",
        "lat": "-37.8989998",
        "longt": "144.080999"
    },
    table_name = 'events';

function addEvent(data, req, res) {

    if (req.params && req.params.customerId && data.customer_id && (req.params.customerId === data.customer_id)) {
        let query = "INSERT INTO " + table_name;
        query += "(" + eventTable + ")";
        query += " VALUES (";
        query += "'" + data.title + "', ";
        query += "'" + data.customer_id + "', ";
        query += "'" + data.location + "', ";
        query += "'" + data.starts + "', ";
        query += "'" + data.ends + "', ";
        query += "'" + data.rsvp + "', ";
        query += "'" + createDateString() + "', ";
        query += "'" + data.image + "', ";
        query += "'" + data.lat + "', ";
        query += "'" + data.longt + "'";
        query += ")";

        db_query(query, function (result) {
            console.log(result);
            let data = {};
            if (result.error) {
                data = { status: result.error.code, message: 'DATABASE ERROR!', details: result.error };
            } else {
                data = { status: 200, message: 'CONGRATULATIONS!. Event successfully created.' };
            }
            res
                .status(data.status)
                .json(data);
        });
    } else {
        res
            .status(400)
            .json({ status: 400, message: 'Customer ID required!' });
    }
}

function viewEvents(req, res) {
    if (req.params && req.params.customerId) {
        const params = req.params,
            custId = params.customerId;

        if (params.eventId) {
            const eventId = params.eventId;
        }


        let query = "SELECT * FROM events WHERE customer_id = " + custId;
        query = eventId ? query + " and event_id = " + eventId : query;

        db_query(query, function (results) {
            if (results.success) {
                const result = results.success.result;
                const momentFormat = 'LLLL';
                if (result.length) {
                    result.forEach(function (item) {
                        item.event_starts = moment(item.event_starts).format(momentFormat);
                        item.event_ends = moment(item.event_ends).format(momentFormat);
                        item.event_rsvp = moment(item.event_rsvp).format(momentFormat);
                        item.event_created = moment(item.event_created).format(momentFormat);
                    });
                    res
                        .status(200)
                        .json({ status: 200, message: 'SUCCESS!', events: result });
                } else {
                    res
                        .status(404)
                        .json({ status: 404, message: 'No record found.' });
                }
            } else {
                res
                    .status(results.error.code)
                    .json({ status: results.error.code, message: 'DATABASE ERROR!', details: results.error });
            }
        });
    } else {
        res
            .status(400)
            .json({ status: 400, message: 'Customer ID required!' });
    }
}

function createDateString() {
    const dt = new Date();

    let todaysDate = dt.getDate();
    let month = parseInt(dt.getMonth() + 1, 10);
    let year = dt.getFullYear();
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();

    todaysDate = addOne(todaysDate);
    month = addOne(month);
    year = addOne(year);
    hours = addOne(hours);
    minutes = addOne(minutes);
    seconds = addOne(seconds);


    return year + "-" + month + "-" + todaysDate + " " + hours + ":" + minutes + ":" + seconds;
}

function addOne(str) {
    return str.length === 1 ? "0" + str : str;
}

export { addEvent, viewEvents };
