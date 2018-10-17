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
	linkLabelGerman: {type: String},
	linkLabelFrench: {type: String},
	labelGerman:{type: String},
	labelFrench:{type: String},
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

function updateNavigation(itemDeleted) {
	Page.model.find({
		state: 'published',
		inNavigation: true
	}, function(err, pages) {
		console.log(pages.length);
		var navLink = keystone.get('navigation');
		
		if(itemDeleted === true){
			var navLinkTemp = [{
				labelGerman: 'Home',
				labelFrench: 'Home',
				key: 'home',
				href: '/'
			},  {
				labelGerman: 'Bildergallerie',
				labelFrench: 'Photogalerie',
				key: 'gallery',
				href: '/gallery'
			},  {
				labelGerman: 'Events',
				labelFrench: 'Evenement',
				key: 'events',
				href: '/events'
			},  {
				labelGerman: 'Kleinanzeigen',
				labelFrench: 'Annonces',
				key: 'blog',
				href: '/blog'
			}, {
				labelGerman: 'Chöre',
				labelFrench: 'Chorales',
				key: 'choir',
				href: '/choir'
			},{
				labelGerman: 'Kontakt',
				labelFrench: 'Contact',
				key: 'contact',
				href: '/contact'
			}];
			pages.forEach(function (page){
				navLinkTemp.push({labelGerman: page.linkLabelGerman, labelFrench: page.linkLabelFrench, key: page.title.toLowerCase(), href: '/pages/page/'+page.title.toLowerCase()});
				//console.log("navlink "+ link.label);
				//console.log(navLinkTemp.indexOf(link));
				
				console.log("page:" + page.title)
				//navLinkTemp.splice(navLinkTemp.indexOf(link), 1)
			});
			navLink = navLinkTemp;
			keystone.set('navigation', navLink);
		}
		else{
			pages.forEach(function(page, i) {
				var navPoint = {labelGerman: page.linkLabelGerman, labelFrench: page.linkLabelFrench, key: page.title.toLowerCase(), href: '/pages/page/'+page.title.toLowerCase()};

				
				if((JSON.stringify(navLink)).includes(JSON.stringify(navPoint))){
					console.log("true")
				}
				else{
					console.log("false added " + navPoint.labelGerman + " to Nav");
					
					
						navLink.push(navPoint);
					
				}
			});
		}
	});
}

Page.schema.virtual('content.full').get(function () {
	return this.contentGerman.extended || this.contentGerman.brief || this.contentFrench.extended || this.contentFrench.brief;
});

// Update navigation on page save
Page.schema.post('save', function () {
	console.log('Save Post');
	updateNavigation(false);
});

// Update navigation on page save
Page.schema.post('remove', function () {
	console.log('Delete Post');
	updateNavigation(true);
});

Page.defaultColumns = 'title, state, in Navigation';
Page.register();

updateNavigation(false);
