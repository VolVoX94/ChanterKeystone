var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	
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
		view.render('index', { title: 'News', message: 'Allerlei themenbasierte Nachrichten', isGerman: language.isGerman });
	}
	else{
		view.render('index', { title: 'Accueil', message: 'Présentation', isGerman: language.isGerman });
	}
		
	
};
