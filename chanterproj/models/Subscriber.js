var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */


var Subscriber = new keystone.List('Subscriber');

Subscriber.add({
	email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
	password: {type: Types.Password, initial: true, required: true},
	lastUpdate: {type: Date}
});

Subscriber.schema.post('save', function () {
});

/**
 * Registration
 */
Subscriber.defaultColumns = 'name, email, isAdmin, isSubscriber';
Subscriber.register();
