var keystone = require('keystone');
var Types = keystone.Field.Types;

var Honor = new keystone.List('Honor');

Honor.add({
	members: {type: Types.Relationship, ref: 'User', index: true, many: true},
	lastUpdate: {type: Date},
});

Honor.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Honor.schema.post('save', function () {
	this.lastUpdate = Date.now();
});

Honor.defaultColumns = 'firstName, lastName, address, place';
Honor.register();
