
/**
 * @author Rock
 */
define(function(require) {
    var $ = require('lib/jquery');
    require('lib/cookie');
    
    var _ = require('lib/underscore');
    var Backbone = require('lib/backbone');
    var CUsers = require('CUsers');
    
    var Tips = require('plugins/form.tips');

    /**
     * @param 
     * @author Rock
     */
    var HomeView = Backbone.View.extend({

        el: 'body',
        j_userName: $('.j_userName'),
        j_password: $('.j_password'),
        j_login: $('.j_login'),
        fragement: null,
        Collection: null,
        bReady: false,							// 变量命名规则
        nameValidated: false,
        passwordValidated: false,
        
        events: {
        	'input .j_userName': 'validateName',
    		'input .j_password': 'validatePassword',
    		
    		'change .j_userName': 'validateName',
    		'change .j_password': 'validatePassword',
    		'blur .j_userName': 'validateName',
    		'blur .j_password': 'validatePassword'
//			,'click .j_login': 'fnLogin'
        },
        initialize: function(o) {
        	
        	var oTips = new Tips({
        		fields: ['j_userName', 'j_password']
        	});
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
        validateName: function(e) {
//        	console.log('validateName:',e);
        	if (this.j_userName.val().length>0) {
        		this.nameValidated= true;
        		if(this.passwordValidated){
        			this.beforeSubmit();
        			return;
        	}}else{
        		this.beforeSubmit(true);
    			this.nameValidated = false;
    			return;
    	}},
		validatePassword: function(e){
//        	console.log('validatePassword:',e);
        	if (this.j_password.val().length>0) {
        		this.passwordValidated= true;
        		if(this.nameValidated){
        			this.beforeSubmit();
        			return;
        	}}else{
        		this.beforeSubmit(true);
    			this.passwordValidated = false;
    			return;
    	}},
        beforeSubmit: function(b){
        	if(b){
        		this.j_login.prop('disabled',true);
        	}else{
        		this.j_login.removeAttr('disabled');
        	}
        },
        fnLogin: function(){
        	this.Collection.fnLogin({
    			userName : this.j_userName.val(),
        		password : this.j_password.val()
            }).done(this.fnLoginSuccess.bind(this)).fail(this.fnLoginFailure.bind(this));
        },
        fnLoginSuccess: function(){
        	console.log('fuck fnLoginSuccess!');
        },
        fnLoginFailure: function(){
        	console.log('fuck fnLoginFailure!');
        },
        render: function() {
//        	this.Collection.on('change', this.weaver);
//        	this.Collection.on('empty', this.clear);
//            WebtopRequest.fnApiDesktop({
//                path: 'webtop',
//                depth:1 
//            }).done(this.fnSGetapps.bind(this)).fail(this.fnFGetapps.bind(this));
        },
        weaver: function(){
        	
        } 
        ,fnSendToFriends: function(o){
            o.render = $this.render;
//            new sendToFriends(o) ;
        }
        
    });

    return HomeView;
});