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
	view.render('comitee', { title: 'Comité de la FSCV', message: 'See the people organising everything', isGerman: language.isGerman  });
};