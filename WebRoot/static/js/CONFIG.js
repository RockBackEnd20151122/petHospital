;var CONFIG = {
	TEST: false//window.location.protocol === 'file:'?true:false
};
var require = {
    //By default load any module IDs from js/lib
    baseUrl: 'static/js/',
    urlArgs: "v=" + (CONFIG.TEST?Date.now().toString():''),
    waitSeconds: 0,
    shim: {
    	'lib/backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['lib/underscore', 'lib/jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone',
            init: function (bar) {	// will be called right when require the module
//            	console.log('backbone init of shim.');
                return this.Backbone.noConflict();
            }
        },
    	'lib/underscore': {
            exports: '_'									// TODO: the use of exported modules
        },
//        'player/application/Application' : ['lib/jquery', 'lib/backbone'],			//depth 01
        'lib/cookie': {
            deps: ['lib/jquery']
        },
        'modules/petsHospital/view/HomeView': {
            deps: ['lib/jquery']
        }
        ,callback: function(){
        	console.log('fuck the callback in CONFIG.');
        }
        
        /*,callback: function(module1, module2) {
            //This function will be called when all the dependencies
            //listed above in deps are loaded. Note that this
            //function could be called before the page is loaded.
            //This callback is optional.
        }*/
    },
    paths: {
        'lib/underscore': 'lib/lodash'
    }
};