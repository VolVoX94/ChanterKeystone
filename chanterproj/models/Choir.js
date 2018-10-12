var keystone = require('keystone');
var Types = keystone.Field.Types;
var Choir = new keystone.List('Choir');

Choir.add({
	name: {type: String, required: true, initial: true},
	place: {type: String},
	plz: {type: Types.Number},
	
	choirAdmin: {type: Types.Relationship, ref: 'User', index: true},
	president: {type: Types.Relationship, ref: 'User', index: true, many: true},
	director: {type: Types.Relationship, ref: 'User', index: true, many: true},
	secondDirector: {type: Types.Relationship, ref: 'User', index: true, many: true},
	secretary:{type: Types.Relationship, ref: 'User', index: true, many:true},
	cashier: {type: Types.Relationship, ref: 'User', index: true, many: true},
	
	foundingYear: {type: Types.Number},

	typeChoir: {type: Types.Select, options: 'CX, CD, CH, CJ, CE, Select', default: 'Select', index: true},
	secondTypeChoir: {type: Types.Select, options: 'CX, CD, CH, CJ, CE, Select', default: 'Select', index: true},
	groupMt: {type: Types.Select, options: 'BV_Y, BV_N, UCC_Y, UCC_N, VC_Y, VC_N, VOG_Y, VOG_N, Select', default: 'Select', index: true},
	entranceGroupMt: {type: Types.Number},
	memberUSC: {type: String},
	entranceUSC: {type: Types.Number},
	lang: {type: Types.Select, options: 'Deutsch, Français, English, Italiano, Español, Select', default: 'Select', index: true},
	remarks: {type: Types.Html, wysiwyg: true, height: 150},
	homepage: {type: String},
	lastUpdate: {type: Date},

});

Choir.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Choir.defaultColumns = 'name, place, plz, director, president';

Choir.register();
