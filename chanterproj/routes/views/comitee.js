/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	
	// Set locals
	locals.section = 'comitees';

	// Load the items by sortOrder
	view.query('comitees', keystone.list('Committee').model.find().sort('sortOrder')
		.populate('director')
		.populate('president')
		.populate('coPresident')
		.populate('porteDrapeau'));

	// Render the view
	if(language.isGerman==true){
		view.render('comitee', { title: 'Vorstand', message: 'Vorstandsmitglied', isGerman: language.isGerman  });
	}
	else{
		view.render('comitee', { title: 'Comité de la FSCV', message: 'Membres du comité de la FSCV', isGerman: language.isGerman  });
	}
};
