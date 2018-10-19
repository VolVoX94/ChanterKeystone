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
	if(language.isGerman==true){
		view.render('honor', { title: 'Ehrenmitglieder', message: '', isGerman: language.isGerman  });
	}
	else{
		view.render('honor', { title: "Membres d'honneur", message: '', isGerman: language.isGerman  });
	}
	
};
