var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "";

	// Set locals
	locals.section = 'pages';
	locals.filters = {
		page: req.params.page,
	};
	locals.data = {
		pages: [],
	};

	// Load the current page
	view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: locals.filters.page,
		});

		q.exec(function (err, result) {
			locals.data.page = result;
			setTitle(locals.data.page);
			next(err);
		});

	});

	// Load other pages
	view.on('init', function (next) {

		var q = keystone.list('Page').model.find().where('state', 'published').sort('-publishedDate').limit('4');

		q.exec(function (err, results) {
			locals.data.pages = results;
			next(err);
		});

	});
	
	function setTitle(page) {
		title = page.labelGerman;
		console.log("In der funktion:" + title);
	};
	
	view.render('page',{isGerman: language.isGerman });
};
