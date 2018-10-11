/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'choir';
	
	//will only load when a user is logged in
	if(res.locals.user === undefined){
		view.render('index', { title: 'Home', message: 'Home, sweet Home', isGerman: language.isGerman });
	}
	else{
		// Load the items by sortOrder
		view.query('choirs', keystone.list('Choir').model.find({president: res.locals.user}).sort('sortOrder').populate('president', 'name'));

		// Render the view
		view.render('dashboard', { title: 'Choir', message: 'Manage your data', isGerman: language.isGerman  });
	}
};
