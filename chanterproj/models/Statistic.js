var keystone = require('keystone');
var Types = keystone.Field.Types;

var Statistic = new keystone.List('Statistic');

Statistic.add({
	countIndex: {type: Types.Number, required: true, initial: true},
	countGallery: {type: Types.Number, required: true, initial: true},
	countEvents: {type: Types.Number, required: true, initial: true},
	countBlog: {type: Types.Number, required: true, initial: true},
	countChoir: {type: Types.Number, required: true, initial: true},
	countContact: {type: Types.Number, required: true, initial: true},
	countDashboard: {type: Types.Number, required: true, initial: true},
	
	countSentTicket: {type: Types.Number, required: true, initial: true},
	countSentNewsletter: {type: Types.Number, required: true, initial: true},
	
	isStored: {type: Boolean, required: true,},
});

Statistic.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Statistic.schema.post('save', function () {

});

Statistic.defaultColumns = 'title';
Statistic.register();
