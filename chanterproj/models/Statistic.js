var keystone = require('keystone');
var Types = keystone.Field.Types;

var Statistic = new keystone.List('Statistic');

Statistic.add({
	title: {type: String, required: true, initial: true},
});

Statistic.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Statistic.schema.post('save', function () {
	this.sendTime = Date.now();
	if(this.state = 'send'){
		//require("openurl").open("http://rauschma.de");
	}
});

Statistic.defaultColumns = 'title';
Statistic.register();
