
/**
 * @description local config
 */
require.config({
	paths : {
		"HomeView" : "modules/petsHospital/view/HomeView",
		'CUsers': 'modules/petsHospital/data/collections/CUsers',
		'Requests': 'modules/petsHospital/data/Requests',
		'Util': 'Util',
		'Tips' : 'plugins/form.tips'
	}
// ,waitSeconds: 0
});

define(function(require) {

//	var fuck = require('lib/underscore');
	var $ = require('lib/jquery');

	var HomeView = require('HomeView');
	new HomeView({
		a: 'fuckA'
	});
	// var HomeView = require('modules/petsHospital/view/HomeView');
});
