
/**
 * @description local config
 */
require.config({
	paths : {
		'CUsers': 'modules/petsHospital/data/collections/CUsers',
		'Requests': 'modules/petsHospital/data/Requests'
	}
// ,waitSeconds: 0
});
define('SearchView', function(require) {
    var $ = require('lib/jquery');
    require('lib/cookie');
    
    var _ = require('lib/underscore');
    var Backbone = require('lib/backbone');
    var CUsers = require('CUsers');

    /**
     * @param 
     * @author Rock
     */
    var SearchView = Backbone.View.extend({

        el: 'body',
        j_searchType: $('input[name="searchType"]'),
        fragement: null,
        Collection: null,
        bReady: false,							// 变量命名规则
        nameValidated: false,
        passwordValidated: false,
        
        events: {
        	'click .j_search': 'validateName',
        	'click [name="searchType"]': 'fnSearchType'
    		
//			,'click .j_login': 'fnLogin'
        },
        initialize: function(o) {
        	var _t = this;
            _.bindAll(this);	// make sure the "this" value of all the methods in this class is always referring to the current instance
            this.fragement = document.createDocumentFragment();
            
            this.Collection = new CUsers({});
//            cShortcut.on('empty', this.clear);
            this.listenTo(this.Collection, "change", this.weaver);
            this.render();
//          cShortcutOfGroup.on('add', this.addShortcutOfGroup, this);
            
//          this.$('.celsius').val(this.model.get('celsius'))
//    		this.$('.fahrenheit').val(this.model.fahrenheit())

            
        },
        fnSearchType: function(e){
        	var value = $(e.target).val();
        	if(value=='pets'){
        		$('.searchPets').show();
        		$('.searchDoctor').hide();
        	}else{
        		$('.searchPets').hide();
        		$('.searchDoctor').show();
        	}
        	console.log($(e.target).val());
        },
        sendRequest: function(){
        	
        }
    });

    return SearchView;
});
define(['SearchView','require'], function(SearchView, require) {

//	var fuck = require('lib/underscore');
	var $ = require('lib/jquery');

	new SearchView({
		a: 'fuckA'
	});
	// var HomeView = require('modules/petsHospital/view/HomeView');
});