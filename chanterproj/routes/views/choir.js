/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "";
	var message = "";

	if(language.isGerman === true){
		title = "Chöre";
		message = "Sehe unsere Chöre";
	}
	else{
		title = "Choeur";
		message = "Voir nos chœurs";
	}
	
	
	//---------------- STATISTIC COUNTER --------------------------------
	var d = new Date();
	var n = d.getMonth();

	keystone.list('Statistic').model.update(
		{actuelMonth: n},
		{
			$inc: {
				countChoir: 1
			}
		},
		{upsert: true}
	).exec(function(err,result){
		//Query will be executed
	});
	//---------------- STATISTIC COUNTER --------------------------------
	
	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find({state: 'published'}).sort('sortOrder')
		.populate('president', 'name')
		.populate('cashier', 'name')
		.populate('secretary', 'name')
		.populate('director', 'name'));

	// Render the view
	view.render('choir', { title: title, message: message, isGerman: language.isGerman  });

};
