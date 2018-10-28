/* eslint-disable linebreak-style */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "Newsletter Registration";
	var message = "Registrieren Sie sich für den Newsletter";

	if(language.isGerman === true){
		title = "Datenverwaltung";
		message = "Verwalten Sie ihre Daten";
	}
	else{
		title = "Gestion des données";
		message = "Gérez vos données";
	}
	
	//---------------- STATISTIC COUNTER --------------------------------
	var d = new Date();
	var n = d.getMonth();

	keystone.list('Statistic').model.update(
		{actuelMonth: n},
		{
			$inc: {
				countDashboard: 1
			}
		},
		{upsert: true}
	).exec(function(err,result){
		//Query will be executed
	});
	//---------------- STATISTIC COUNTER --------------------------------

	// Set locals
	locals.section = 'choir';
	
	//will only load when a user is logged in
	if(res.locals.user === undefined){
		view.render('index', { title: 'Home', message: 'Home, sweet Home', isGerman: language.isGerman });
	}
	else{
		
		view.on('init', function (next) {
			var q = keystone.list('Choir').model.find({choirAdmin: res.locals.user}).sort('sortOrder')
							.populate('president', 'name')
							.populate('cashier', 'name')
							.populate('secretary', 'name')
							.populate('director', 'name')
							.populate('secondDirector', 'name');
			q.exec(function (err, results) {
				locals.choirs = results;
				next(err);
			});
		});

		view.on('init', function (next) {
			var q = keystone.list('Choir').model.find().sort('sortOrder')
				.populate('president', 'name')
				.populate('cashier', 'name')
				.populate('secretary', 'name')
				.populate('director', 'name')
				.populate('secondDirector', 'name');
			q.exec(function (err, results) {
				locals.allChoirs = results;
				next(err);
			});
		});

		view.on('init', function (next) {
			var q = keystone.list('Statistic').model.find().sort();
			q.exec(function (err, results) {
				locals.statistic = results;
				next(err);
			});
		});

		view.on('init', function (next) {
			var q = keystone.list('User').model.find().sort();
			q.exec(function (err, results) {
				locals.useritem = results;
				next(err);
			});
		});
		
		if(res.locals.user.isAdmin){
			//AdminTickets
			view.on('init', function (next) {
				var q = keystone.list('Enquiry').model.find({responsible: 'admin'}).sort({priority: 1});
				q.exec(function (err, results) {
					locals.enquiryItemForAdmin = results;
					next(err);
				});
			});
		}

		view.on('init', function (next) {
			var q = keystone.list('Enquiry').model.find({responsible: res.locals.user._id}).sort({priority: 1});
			q.exec(function (err, results) {
				locals.enquiryItem = results;
				next(err);
			});
		});

		view.on('init', function (next) {
			var q = keystone.list('Event').model.find({organizerID: res.locals.user._id, published: 'false'}).sort();
			q.exec(function (err, results) {
				locals.proposedEvents = results;
				next(err);
			});
		});
		
		// Render the view
		view.render('dashboard', { title: title, message: message, isGerman: language.isGerman  });
	}
};
