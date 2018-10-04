var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Load the galleries by sortOrder
	view.query('newsletter', keystone.list('Newsletter').model.find().sort('sortOrder'));

	keystone.list('User').model.find({where: {isSubscriber: true}}).then((user) => {
		view.render('newsletter', {User: user});
	});

	// Render the view
	//view.render('newsletter', {User: keystone.list('User').model.find()});
};
