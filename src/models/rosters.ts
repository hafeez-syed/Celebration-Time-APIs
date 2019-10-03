/**
 * Created by Hafeez Syed on 6/10/2016.
 */

function Rosters(FIELDS) {
    this.name = FIELDS.name;
    this.start_date = FIELDS.start_date;
    this.period_days = FIELDS.period_days;
    this.recurring_period = FIELDS.recurring_period;
    
    
    var errors = [];
    
    if(!this.name) {
        errors.push("Roster name is required!");
    }
    
    if(!this.start_date) {
        errors.push("Start date is required!");
    }

    if(!this.period_days) {
        errors.push("Roster period is required!");
    }

    if(!this.recurring_period) {
        errors.push("Recuriing period is required!");
    }
    
    return errors;
}

module.exports = Rosters;