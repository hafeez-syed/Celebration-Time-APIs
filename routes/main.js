/**
 * Created by Hafeez Syed on 5/10/2016.
 */

function appRoutes(app, router) {
	
	// Handler for all Unauthorized and non existent URLs
	app.use(function(err, req, res, next) {
		if(401 == err.status) {
			res
				.status(401)
				.json({status: 401, message: 'Sorry!. You are Unauthorized.'});
		}
	});
	
	var route_index = require('./index')(router);
	app.use('/', route_index);

	var route_customers = require('./customers')(router);
	app.use('/api/customers/', route_customers);

	var route_members = require('./members')(router);
	app.use('/api/members/', route_members);

}

module.exports = appRoutes;
