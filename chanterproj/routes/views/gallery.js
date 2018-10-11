var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	// Render the view
	view.render('gallery', { title: 'Gallery', message: 'See what our gallery has to offer to you eyes!', isGerman: language.isGerman  });

};
