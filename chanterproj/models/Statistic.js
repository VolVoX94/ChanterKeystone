var keystone = require('keystone');
var Types = keystone.Field.Types;

var Statistic = new keystone.List('Statistic');

Statistic.add({
	countIndex: {type: Types.Number, required: true, initial: true},
	countGallery: {type: Types.Number, required: true, initial: true},
	countEvents: {type: Types.Number, required: true, initial: true},
	countAds: {type: Types.Number, required: true, initial: true},
	countHelp: {type: Types.Number, required: true, initial: true},
	countChoir: {type: Types.Number, required: true, initial: true},
	countDashboard: {type: Types.Number, required: true, initial: true},
	countVisitorPosts: {type: Types.Number, required: true, initial: true},
	
	countSentTicket: {type: Types.Number, required: true, initial: true},
	countClosedTicket: {type: Types.Number, required: true, initial: true},
		
	actuelMonth: {type: Types.Number, required: true, initial: true},
});

Statistic.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Statistic.schema.post('save', function () {

});

Statistic.defaultColumns = 'title, actuelMonth';
Statistic.register();
