var keystone = require('keystone');
var Types = keystone.Field.Types;

var Commission = new keystone.List('Commission');

Commission.add({
	members: {type: Types.Relationship, ref: 'User', index: true, many: true},
	lastUpdate: {type: Date},
});



Commission.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Commission.schema.post('save', function () {
	this.lastUpdate = Date.now();

});

Commission.defaultColumns = 'firstName, lastName, address, place';
Commission.register();
