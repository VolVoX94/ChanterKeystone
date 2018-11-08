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
				countGallery: 1
			}
		},
		{upsert: true}
	).exec(function(err,result){
		//Query will be executed
	});
	//---------------- STATISTIC COUNTER --------------------------------

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	// Render the view
	
	if(language.isGerman==true){
		view.render('gallery', { title: 'Galerie', message: 'Sehen Sie sich unsere Bilder an!', isGerman: language.isGerman  });
	}
	else{
		view.render('gallery', { title: 'Galerie', message: 'Voir nos photos!', isGerman: language.isGerman  });
	}

};
