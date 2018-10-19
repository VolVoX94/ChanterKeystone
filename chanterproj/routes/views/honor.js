/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'honor';

	// Load the items by sortOrder
	view.query('honor', keystone.list('Honor').model.find().sort('sortOrder')
		.populate('members'));

	// Render the view
	view.render('honor', { title: 'Membres de Honeur', message: 'See the people organising everything', isGerman: language.isGerman  });
};
