/**
 * Created by Hafeez Syed on 6/10/2016.
 */

function Events(FIELDS) {
    this.title = FIELDS.title;
    this.customer_id = FIELDS.customer_id;
    this.location = FIELDS.location;
    this.starts = FIELDS.starts;
    this.ends = FIELDS.ends;
    this.rsvp = FIELDS.rsvp;
    this.image = FIELDS.image;
    this.lat = FIELDS.lat;
    this.longt = FIELDS.longt;

    var errors = [];
    
    if(!this.title) {
        errors.push("Event title is required!");
    }
    
    if(!this.customer_id) {
        errors.push("Customer ID required!");
    }
    
    if(!this.location) {
        errors.push("Location can't be blank.");
    }
    
    if(!this.starts) {
        errors.push("Event start datetime required!");
    }
    
    if(!this.ends) {
        errors.push("Event end datetime required!");
    }
    
    if(!this.rsvp) {
        errors.push("RSVP date required!");
    }

    if(!this.lat) {
        errors.push("Latitude is required!");
    }

    if(!this.longt) {
        errors.push("Longitude is required!");
    }

    return errors;
}

module.exports = Events;