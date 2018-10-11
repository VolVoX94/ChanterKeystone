var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Load the galleries by sortOrder
	view.query('events', keystone.list('Event').model.find().sort('sortOrder'));

	// Render the view
	view.render('events', { title: 'Events', message: 'Look at our recent and upcoming events', isGerman: language.isGerman  });
};
