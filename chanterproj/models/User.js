var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */


var User = new keystone.List('User');

User.add({
	name: {type: Types.Name, required: true, index: true},
	address: {type: String, index: true},
	secondAddress: {type: String, index: true},
	plz: {type: Types.Number, index: true},
	place: {type: String, index: true},
	privatePhone: {type: Types.Number, index: true},
	businessPhone: {type: Types.Number, index: true},
	fax: {type: Types.Number, index: true},
	email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
	comiteRole: {type: String, index: true},
	image: {type: Types.CloudinaryImage},
	password: {type: Types.Password, initial: true, required: true},
	isSubscriber: {type: Boolean},
	lastUpdate: {type: Date},
}, 'Permissions', {
	isAdmin: {type: Boolean, label: 'Can access Keystone', index: true},
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.schema.post('save', function () {
	this.lastUpdate = Date.now();
});

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin, isSubscriber';
User.register();
