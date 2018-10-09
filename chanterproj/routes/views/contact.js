var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', {action: 'contact'}, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
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

	view.render('contact', { title: 'Contact', message: 'Are you interested? Contact us!', isGerman: language.isGerman  });
};
