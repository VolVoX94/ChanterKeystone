var keystone = require('keystone');
var Types = keystone.Field.Types;

var Committee = new keystone.List('Committee');

Committee.add({
	
	name: {type: String},
	director: {type: Types.Relationship, ref: 'User', index: true, many: true},
	president: {type: Types.Relationship, ref: 'User', index: true, many: true},
	coPresident: {type: Types.Relationship, ref: 'User', index: true, many: true},
	porteDrapeau:{type: Types.Relationship, ref: 'User', index: true, many: true},
	
	fscv: {type: Types.Select, options: 'CC, CM, MH, CO, PD, None', default: 'None', index: true},
	gscbv: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	ucc: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	gcvc: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	vog: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	avcc: {type: Types.Select, options: 'CO, None', default: 'None', index: true},
	ocv: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	usc: {type: Types.Select, options: 'CO, CM, MH, None', default: 'None', index: true},
	otherCommittees: {type: Types.Select, options: 'CO, None', default: 'None', index: true},
	ancien: {type: String},
	tri1CC: {type: Types.Number},
	tri2CM: {type: Types.Number},
	tri3MH: {type: Types.Number},
	tri4GRP: {type: Types.Number},
	tri5AVCC: {type: Types.Number},
	tri6Others: {type: Types.Number},
	tri7USC: {type: Types.Number},
	lastUpdate: {type: Date},
});



Committee.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

Committee.schema.post('save', function () {
		this.lastUpdate = Date.now();

});

Committee.defaultColumns = 'name, director, president, coPresident, porteDrapeau';
Committee.register();
