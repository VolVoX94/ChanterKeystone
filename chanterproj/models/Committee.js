var keystone = require('keystone');
var Types = keystone.Field.Types;

var Committee = new keystone.List('Committee');

Committee.add({
	firstName: {type: String, required: true, initial: true},
	lastName: {type: String, required: true, initial: true},
	address: {type: String, required: true, initial: true},
	plz: {type: Types.Number, required: true, initial: true},
	place: {type: String, required: true, initial: true},
	phoneNumber: {type: String, required: true, initial: true},
	email: {type: Types.Email, required: true, initial: true},
	functionCommittee: {type: String, required: true, initial: true},
	profileImage: {type: Types.CloudinaryImages},
});

Committee.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Committee.schema.post('save', function () {

});

Committee.defaultColumns = 'firstName, lastName, address, place';
Committee.register();
