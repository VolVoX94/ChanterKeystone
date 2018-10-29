var keystone = require('keystone');
var Types = keystone.Field.Types;

var Forms = new keystone.List('Forms', {
	autokey: {from: 'name', path: 'key', unique: true},
});

Forms.add({
	name: {type: String, required: true},
	form: {type: Types.Html, required: true, initial: true},
	spreadsheet: {type: Types.Html, required: true, initial: true},
});

Forms.register();
