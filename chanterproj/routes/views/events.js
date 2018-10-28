var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "";
	var message = "";

	if(language.isGerman === true){
		title = "Events";
		message = "Sehe unsere Events";
	}
	else{
		title = "Evenement";
		message = "Voir nos evenement";
	}
	

	//---------------- STATISTIC COUNTER --------------------------------
	var d = new Date();
	var n = d.getMonth();

	keystone.list('Statistic').model.update(
		{actuelMonth: n},
		{
			$inc: {
				countEvents: 1
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

	// Load the events by sortOrder
	view.query('events', keystone.list('Event').model.find({published: 'true'}).sort('sortOrder'));

	// Render the view
	view.render('events', { title: title, message: message, isGerman: language.isGerman  });
};
