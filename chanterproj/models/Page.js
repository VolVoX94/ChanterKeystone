var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: {name: 'title'},
	autokey: {path: 'slug', from: 'title', unique: true},
});

Page.add({
	title: {type: String, required: true},
	state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
	image: {type: Types.CloudinaryImage},
	inNavigation: {type: Types.Boolean},
	contentGerman: {
		brief: {type: Types.Html, wysiwyg: true, height: 150},
		extended: {type: Types.Html, wysiwyg: true, height: 400},
	},
	contentFrench: {
		brief: {type: Types.Html, wysiwyg: true, height: 150},
		extended: {type: Types.Html, wysiwyg: true, height: 400},
	},
});

function updateNavigation() {
	Page.model.find({
		state: 'published',
		inNavigation: true
	}, function(err, pages) {
		console.log(pages.length);
		pages.forEach(function(page, i) {
			var navPoint = {label: page.title, key: page.title.toLowerCase(), href: '/pages/page/'+page.title.toLowerCase()};
			var navLink = keystone.get('navigation');
			
			navLink.push(navPoint);
		});
	});
}

Page.schema.virtual('content.full').get(function () {
	return this.contentGerman.extended || this.contentGerman.brief || this.contentFrench.extended || this.contentFrench.brief;
});

// Update navigation on page save
Page.schema.post('save', function () {
	console.log('Save Post');
	//updateNavigation();
});

Page.defaultColumns = 'title, state, in Navigation';
Page.register();

updateNavigation();
