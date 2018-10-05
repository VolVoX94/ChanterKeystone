var keystone = require('keystone');
var Types = keystone.Field.Types;

var Newsletter = new keystone.List('Newsletter');

Newsletter.add({
	title: {type: String, required: true, initial: true},
	state: {type: Types.Select, options: 'save, send', default: 'send', index: true},
	contentAttache: {type: Types.CloudinaryImage},
	sendTime: {type: Types.Datetime},
	linkToNews: {type: String, wysiwyg: true, height: 400},
	subscribers: {type: Types.Relationship, many:true, ref: 'User', index: true},
});

Newsletter.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Newsletter.schema.post('save', function () {
	this.sendTime = Date.now();
	if(this.state = 'send'){
		//require("openurl").open("http://rauschma.de");
	}
});

Newsletter.defaultColumns = 'title';
Newsletter.register();
