
define(function(require) {

    var Backbone = require('lib/backbone');

    var MUsers = Backbone.Model.extend({

        defaults: {
        	id:			'',
        	name: 		'',
        	address:	'',
        	city: 		'',
        	phone:		'',
        	password:	''
        },
        
        initialize: function() {
        	
        },
        getUserId: function(){
        	return this.getUserId();
        },
        
        clear: function() {
            this.destroy();
        }
    });

    return MUsers;
});
