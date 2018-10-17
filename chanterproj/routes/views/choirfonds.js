var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "Choirfonds";
	var message = "Choirfonds";

	if(language.isGerman === true){
		title = "Chorfonds";
		message = "Das AVCC-Foyer";
	}
	else{
		title = "Fonds choral";
		message = "Le Foyer AVCC";
	}

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'choirfonds';

	// Render the view
	view.render('choirfonds', { title: title, message: message, isGerman: language.isGerman });
};
