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

	
	
	// Render the view
	view.render('index', { title: 'Home', message: 'Home, sweet Home', isGerman: language.isGerman });
};
