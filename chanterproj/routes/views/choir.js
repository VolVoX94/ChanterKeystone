/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find().sort('sortOrder').populate('president', 'name'));

	// Render the view
	view.render('choir', { title: 'Choir', message: 'See our Choirs', isGerman: language.isGerman  });

};
