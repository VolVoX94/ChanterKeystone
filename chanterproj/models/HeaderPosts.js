var keystone = require('keystone');
var Types = keystone.Field.Types;

var HeaderPosts = new keystone.List('HeaderPosts');

HeaderPosts.add({
	posts: {type: Types.Relationship, ref: 'Post', index: true, many: true},
	lastUpdate: {type: Date},
});



HeaderPosts.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

HeaderPosts.schema.post('save', function () {
	this.lastUpdate = Date.now();
});

HeaderPosts.defaultColumns = 'firstName, lastName, address, place';
HeaderPosts.register();
