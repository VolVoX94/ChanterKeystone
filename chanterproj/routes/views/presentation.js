var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var language = keystone.get('language');
	var title = "";
	var message = "";

	if(language.isGerman === true){
		title = "Präsentation";
		message = "Verband Walliser Gesangvereine";
	}
	else{
		title = "Presentation";
		message = "La Fédération des Sociétés de Chant du Valais (FSCV)";
	}

	//---------------- STATISTIC COUNTER --------------------------------
	/*
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
*/

	// Render the view
	if(language.isGerman==true){
		view.render('presentation', { title: title, message: message, isGerman: language.isGerman });
	}
	else{
		view.render('presentation', { title: title, message: message, isGerman: language.isGerman });
	}


};
