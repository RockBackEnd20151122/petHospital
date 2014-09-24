define(function(require) {
	var $ = require('lib/jquery');
	var util = require('Util');
	
	var Tips = function(opts) {
		this.opts = $.extend(true,{}, Tips.defaults,opts );
		this.timestamp = util.getTimestamp();
		
		console.log(this.opts.fields);
		var id = 'j_userName';
		
		this.field = $('.'+id);
		
		var className = 'tip'+this.timestamp;
		this.tipBox = $('<div class="tips '+ className +'"></div>').appendTo('body');
		var position = util.getOffset(this.field[0]);
		console.log(position);
		
		this.tipBox.css({
			top: position.top,
			left: position.left+ position.width
//			,display:'none'
		});
		this.field.addClass('e');
		
		console.log($('.'+id).width());
		
		this.init();
	};
	Tips.prototype = {
		init: function(){
			
		},
		showError: function(className){
			var field = $('.'+className);
			field.addClass('e');
			var errClass = 'tip'+this.timestamp;
			
			this.tipBox = $('<div class="tips '+ errClass +'"></div>').after(field);
			var position = util.getOffset(ield[0]);
			console.log(position);
			
			this.tipBox.css({
				top: position.top,
				left: position.left+ position.width
//				,display:'none'
			});
			this.field.addClass('e');
		},
		clearError: function(){
			
		},
		changeTheField: function(){
			
		}
		
	};
	Tips.defaults = {};
	return Tips;
});