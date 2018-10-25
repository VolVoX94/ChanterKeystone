var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "Ticket";
	var message = "Support";

	if(language.isGerman === true){
		title = "Benötigen Sie Hilfe?";
		message = "Erstellen Sie ein Ticket und beschreiben Sie Ihr Anliegen";
	}
	else{
		title = "Besoin d'aide?";
		message = "Créez un ticket et décrivez votre problème";
	}

	//---------------- STATISTIC COUNTER --------------------------------
	var d = new Date();
	var n = d.getMonth();

	keystone.list('Statistic').model.update(
		{actuelMonth: n},
		{
			$inc: {
				countHelp: 1
			}
		},
		{upsert: true}
	).exec(function(err,result){
		//Query will be executed
	});
	//---------------- STATISTIC COUNTER --------------------------------

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;


	view.on('init', function (next) {
		var q = keystone.list('Choir').model.find().sort('sortOrder');
		q.exec(function (err, results) {
			locals.choirs = results;
			next(err);
		});
	});

	// On POST requests, add the Enquiry item to the database
	view.on('post', {action: 'contact'}, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		//---------------- STATISTIC COUNTER --------------------------------
		keystone.list('Statistic').model.update(
			{actuelMonth: n},
			{
				$inc: {
					countSentTicket: 1
				}
			},
			{upsert: true}
		).exec(function(err,result){
			//Query will be executed
		});
		//---------------- STATISTIC COUNTER --------------------------------
		
		
		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, priority, message, responsible',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('ticketManagement', { title: title, message: message, isGerman: language.isGerman  });
};
