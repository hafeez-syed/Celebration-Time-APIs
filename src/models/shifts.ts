/**
 * Created by Hafeez Syed on 6/10/2016.
 */

function Shifts(FIELDS) {
    this.roster_id = FIELDS.roster_id;
    this.start_time = FIELDS.start_time;
    this.end_time = FIELDS.end_time;
    this.break_start_time = FIELDS.break_start_time;
    this.break_end_time = FIELDS.break_end_time;
    this.member_id = FIELDS.member_id;
    this.position = FIELDS.position;
    
    var errors = [];
    
    if(!this.roster_id) {
        errors.push("Roster ID required!");
    }
    
    if(!this.start_time) {
        errors.push("Shift start time is required!");
    }

    if(!this.end_time) {
        errors.push("Shift end time is required!");
    }

    if(!this.break_start_time) {
        errors.push("Shift break start time is required!");
    }

    if(!this.break_end_time) {
        errors.push("Shift break end time is required!");
    }
    
    if(!this.member_id) {
        errors.push("Member ID missing.");
    }
    
    if(!this.position) {
        errors.push("Shift position is required!");
    }
        
    return errors;
}

module.exports = Shifts;