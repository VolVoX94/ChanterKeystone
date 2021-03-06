var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "";
	var message = "";

	if(language.isGerman === true){
		title = "Herzlich Willkommen";
		message = "Auf der Webseite der Walliser Gesangvereine";
	}
	else{
		title = "Bienvenue";
		message = " Sur la page de la Fédération des sociétés de chant du valais";
	}
	
	//---------------- STATISTIC COUNTER --------------------------------
	var d = new Date();
	var n = d.getMonth();
	
	keystone.list('Statistic').model.update(
		{actuelMonth: n},
		{
			$inc: {
				countIndex: 1
			}
		},
		{upsert: true}
	).exec(function(err,result){
		//Query will be executed
	});
	//---------------- STATISTIC COUNTER --------------------------------
	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.query('headerposts', keystone.list('HeaderPosts').model.find().sort('sortOrder')
		.populate({path: 'posts', populate:{path:'author'}}));


	// Render the view
	if(language.isGerman==true){
		view.render('index', { title: title, message: message, isGerman: language.isGerman });
	}
	else{
		view.render('index', { title: title, message: message, isGerman: language.isGerman });
	}
		
	
};
