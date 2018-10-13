var keystone = require('keystone');
var Types = keystone.Field.Types;
var Choir = new keystone.List('Choir');

Choir.add({
	name: {type: String, required: true, initial: true},
	place: {type: String},
	plz: {type: Types.Number},
	
	//only editable from MASTERADMIN
	choirAdmin: {type: Types.Relationship, ref: 'User', index: true},
	
	//All person refs
	president: {type: Types.Relationship, ref: 'User', index: true},
	director: {type: Types.Relationship, ref: 'User', index: true},
	secondDirector: {type: Types.Relationship, ref: 'User', index: true},
	secretary:{type: Types.Relationship, ref: 'User', index: true},
	cashier: {type: Types.Relationship, ref: 'User', index: true},
	
	
	foundingYear: {type: Types.Number},
	typeChoir: {type: Types.Select, options: 'CX, CD, CH, CJ, CE, Select', default: 'Select', index: true},
	secondTypeChoir: {type: Types.Select, options: 'CX, CD, CH, CJ, CE, Select', default: 'Select', index: true},
	groupMt: {type: Types.Select, options: 'BV_Y, BV_N, UCC_Y, UCC_N, VC_Y, VC_N, VOG_Y, VOG_N, Select', default: 'Select', index: true},
	entranceGroupMt: {type: Types.Date},
	chEglise: {type: Types.Boolean},
	chGospel: {type: Types.Boolean},
	type2: {type: String},
	memberUSC: {type: String},
	memberFC: {type: String},
	entranceFC: {type: Types.Date},
	entranceUSC: {type: Types.Date},
	courierName: {type: String},
	dekanat:{type: String},
	lang: {type: Types.Select, options: 'Deutsch, Français, English, Italiano, Español, Select', default: 'Select', index: true},
	remarks: {type: String},
	homepage: {type: String},
	lastUpdate: {type: Date},

});

Choir.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Choir.schema.post('save', function () {
	this.lastUpdate = Date.now();
});

Choir.defaultColumns = 'name, place, plz, director, president';

Choir.register();
