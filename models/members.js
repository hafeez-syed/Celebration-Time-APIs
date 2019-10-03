/**
 * Created by Hafeez Syed on 6/10/2016.
 */

function Members(FIELDS) {
    this.name = FIELDS.name;
    this.role = FIELDS.role;
    this.position = FIELDS.position;
    this.salary = FIELDS.salary;
    this.email = FIELDS.email;
    this.password = FIELDS.password;
    this.street_number = FIELDS.street_number;
    this.street_name = FIELDS.street_name;
    this.suburb = FIELDS.suburb;
    this.postcode = FIELDS.postcode;
    this.state = FIELDS.state;
    this.country = FIELDS.country;
    this.mobile = FIELDS.mobile;
    this.phone = FIELDS.phone;
    this.gender = FIELDS.gender;
    this.dob = FIELDS.dob;
    this.image = FIELDS.image;
    
    var errors = [];
    
    if(!this.name) {
        errors.push("Member name required!");
    }
    
    if(!this.role) {
        errors.push("Member role is required!");
    }

    if(!this.position) {
        errors.push("Member position is required!");
    }

    if(!this.salary) {
        errors.push("Salary is required!");
    }

    if(!this.email) {
        errors.push("Member email required!");
    }
    
    if(!this.password) {
        errors.push("Password can't be blank.");
    }
    
    if(!this.street_number) {
        errors.push("Street number required!");
    }
    
    if(!this.street_name) {
        errors.push("Street name required!");
    }
    
    if(!this.suburb) {
        errors.push("Suburb is required!");
    }
    
    if(!this.postcode) {
        errors.push("Postcode is required!");
    }
    
    if(!this.state) {
        errors.push("State is required!");
    }
    
    if(!this.country) {
        errors.push("Country is required!");
    }
    
    if(!this.mobile) {
        errors.push("Mobile number required!");
    }
    
    if(!this.phone) {
        errors.push("Phone number required!");
    }
    
    if(!this.gender) {
        errors.push("Gender is required!");
    }
    
    if(!this.dob) {
        errors.push("Member's date of birth is required!");
    }
    
    return errors;
}

module.exports = Members;