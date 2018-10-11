var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('index', { title: 'Home', message: 'Home, sweet Home', isGerman: language.isGerman });
};
