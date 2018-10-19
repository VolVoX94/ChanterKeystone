/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'commission';

	// Load the items by sortOrder
	view.query('commission', keystone.list('Commission').model.find().sort('sortOrder')
		.populate('members')); 

	// Render the view
	if(language.isGerman==true){
		view.render('commission', { title: 'Musikkommission', message: 'Mitglied der Musikkommission', isGerman: language.isGerman  });
	}
	else{
		view.render('commission', { title: 'Commission de musique', message: 'Membres de la commission de musique', isGerman: language.isGerman  });
	}
};
