
define(function(require) {
    var Backbone = require('lib/backbone');
    var MUser = require('modules/petsHospital/data/models/MUser');
    var Requests = require('modules/petsHospital/data/Requests');
    
    var CUsers = Backbone.Collection.extend({

        model : MUser,

        initialize : function(options) {
            
            _.bindAll(this);
            
            this.on('empty', this.clear );
            if(options.bOccasional) return;
            // this.fnFriendshipsFriends( options.view.fnSFriendshipsFriends, options.view.fnFFriendshipsFriends );
        },
        fnLogin: function(param){
        	return Requests.fnLogin(param);
        },
        
        searchUsers : function(fnS, fnF, fn, $this) {
            return Requests.fnFriendshipsFriends({}).done(fnS).fail(fnF);
            // fn&&fn.call($this, this.attributes);        },
        
        fnApiSearchGo : function(jp,fnS, fnF){
        	Requests.fnApiSearchGo(jp).done(fnS).fail(fnF);
        },
        
        domWeaver : function(models) {
            models.each(function(book) { });
        },
        
        clear       : function() {
            this.each(function(user){user.trigger('clear');});
            this.reset();
            return this;
        }
    });

    return CUsers;
});
