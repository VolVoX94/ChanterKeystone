var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "Newsletter Registration";
	var message = "Registrieren Sie sich für den Newsletter";

	if(language.isGerman === true){
		title = "Newsletter Registration";
		message = "Registrieren Sie sich für den Newsletter";
	}
	else{
		title = "Newsletter enregistration";
		message = "S'inscrire à la newsletter";
	}
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'subscriberNewsletter';

	// Render the view
	view.render('subscribeNewsletter', { title: title, message: message, isGerman: language.isGerman });
};
