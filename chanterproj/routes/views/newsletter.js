var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	//var chos = keystone.list('Choir').model.find({plz: 3900}).sort('sortOrder');

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'newsletter';

	// Load the galleries by sortOrder
	//view.query('newsletter', keystone.list('Newsletter').model.find().sort('sortOrder'));

	view.on('init', function (next) {
		var q = keystone.list('Newsletter').model.find().sort('sortOrder');
		q.exec(function (err, results) {
			locals.newsletter = results;
			next(err);
		});
	});
	
	view.on('init', function (next) {
	var q = keystone.list('User').model.find({isSubscriber: true}).sort();
		q.exec(function (err, results) {
			locals.useritem = results;
			next(err);
		});
	});

	view.on('init', function (next) {
		var q = keystone.list('Subscriber').model.find().sort();
		q.exec(function (err, results) {
			locals.subscriber = results;
			next(err);
		});
	});
	
	// Render the view
	view.render('newsletter', { title: 'Newsletter', message: 'Read the latest news', isGerman: language.isGerman  });
};
