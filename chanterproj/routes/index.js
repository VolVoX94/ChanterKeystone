/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var Choir = new keystone.List('Choir');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/pages/page/:page', routes.views.page);
	app.get('/setToGerman/:previousPage', (req,res,next) => {
		keystone.set('language', {isGerman: true});
		console.log("Lang changed to German");
		if(req.params.previousPage === 'Index'){
			res.redirect('/');
		}
		else{
			if(req.params.previousPage.includes("DynamicPage")){
				res.redirect('/pages/page/'+ req.params.previousPage.replace("DynamicPage", ""));
				console.log('/pages/page/'+ req.params.previousPage)
			}
			else{
				res.redirect('/'+ req.params.previousPage);
			}
		}

	});
	app.get('/setToFrench/:previousPage', (req,res,next) => {
		keystone.set('language', {isGerman: false});
		console.log("Lang changed to French");
		if(req.params.previousPage === 'Index'){
			res.redirect('/');
		}
		else{
			if(req.params.previousPage.includes("DynamicPage")){
				res.redirect('/pages/page/'+ req.params.previousPage.replace("DynamicPage", ""));
				console.log('/pages/page/'+ req.params.previousPage)
			}
			else{
				res.redirect('/'+ req.params.previousPage);
			}
		}
	});
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/dashboard', routes.views.dashboard);
	app.get('/events', routes.views.events);
	app.get('/comitee', routes.views.comitee);
	app.get('/newsletter', routes.views.newsletter);
	app.get('/choir', routes.views.choir);
	app.all('/contact', routes.views.contact);

	app.post('/dashboardChoir', (req,res,next) => {
		console.log("Choir updated");
		var today = new Date();
		console.log(req.body.plz);
		console.log(req.body.foundingYear);
		if(req.body.plz === ""){
			req.body.plz = 0;
		}
		
		if(req.body.foundingYear === ""){
			req.body.foundingYear = 0;
		}
		
		if(req.body.entranceGroupMt === ""){
			req.body.entranceGroupMt = req.body.entranceGroupMtPrevious;
		}

		if(req.body.entranceFC === ""){
			req.body.entranceFC = req.body.entranceFCprevious;
		}

		if(req.body.entranceUSC === ""){
			req.body.entranceUSC = req.body.entranceUSCprevious;
		}
		
		
		keystone.list('Choir').model.update(
			{ _id: req.body.id },
			{
				$set: {
					name: 				req.body.name,
					place: 				req.body.place,
					plz:				req.body.plz,
					president:			req.body.president,
					director:			req.body.director,
					secondDirector:		req.body.secondDirector,
					secretary:			req.body.secretary,
					cashier:			req.body.cashier,
					foundingYear:		req.body.foundingYear,
					typeChoir:			req.body.typeChoir,
					secondTypeChoir:	req.body.secondTypeChoir,
					groupMt:			req.body.groupMt,
					entranceGroupMt:	req.body.entranceGroupMt,
					chEglise:			req.body.chEglise,
					chGospel:			req.body.chGospel,
					type2:				req.body.type2,
					memberUSC:			req.body.memberUSC,
					memberFC:			req.body.memberFC,
					entranceFC:			req.body.entranceFC,
					entranceUSC:		req.body.entranceUSC,
					courierName:		req.body.courierName,
					dekanat:			req.body.dekanat,
					lang:				req.body.lang,
					remarks:			req.body.remarks,
					homepage:			req.body.homepage,
					lastUpdate:			today
				}
			}
		).exec(function(err,result){
			//Query will be executed
		});
		res.redirect('/dashboard');
	});

	app.post('/dashboardUser', (req,res,next) => {
		console.log("user updated");
		var today = new Date();
		var name = req.body.firstname + " " + req.body.lastname;
		keystone.list('User').model.update(
			{ _id: req.body.id },
			{
				$set: {
					name:				{first: req.body.firstname, last: req.body.lastname},
					address:			req.body.address,
					secondAddress:		req.body.secondAddress,
					plz:				req.body.plz,
					place:				req.body.place,
					privatePhone:		req.body.privatePhone,
					businessPhone:		req.body.businessPhone,
					fax:				req.body.fax,
					email: 				req.body.email,
					isSubscriber:		req.body.isSubscriber,
					isAdmin:			req.body.admin,
					lastUpdate:			today
				}
			}
		).exec(function(err,result){
			//Query will be executed
		});
		
		keystone.list('User').model.findOne(
			{_id : req.body.id}, 
			function(findError, user) {
			if (findError) {
				// handle error
			} else {
				user.password = req.body.password;
				user.save(function(saveError) {
					if (saveError) {
						// handle error
					}
				});
			}
		});
		
		res.redirect('/dashboard');


		
		
	});
	

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
