var ValidationContext = function(el) {
	this.hasError = false;
	this.$el = $(el);
	this.$fromGroup = this.$el.closest('.form-group,li');
	this.$errorBlock = this.$fromGroup.children('.tips.error');
};

ValidationContext.prototype = {
	// 给验证类添加reject方法
	reject : function(errorCont) {
		this.hasError = true;
		this.$el.data('errorCont', errorCont);
		this.renderError();
	},

	// 渲染错误
	renderError : function() {
		var errorCont = this.$el.data('errorCont');
		// 显示出错框
		this.showErrorBox();
		// 先把内容清空，在emptyError里也有清除
		this.$errorBlock.html('');
		this.createErrorHtml(errorCont).appendTo(this.$errorBlock);
		this.$fromGroup.addClass('error');
	},

	// 清空错误，并隐藏错误显示的容器
	emptyError : function() {
		this.$el.data('errorCont', '');
		clearTimeout(this.$el.data("validationTimeout"));
		if (this.$errorBlock.length > 0) {
			this.$errorBlock.html('');
			this.$errorBlock.hide();
		}
		this.$fromGroup.removeClass('error');
	},

	// 显示出错提示容器，如果还没有就先创建并把它赋值给$errorBlock
	showErrorBox : function() {
		if (this.$errorBlock.length > 0) {
			this.$errorBlock.show();
		} else {
			$('<div class="tips error"></div>').appendTo(this.$fromGroup);
			this.$errorBlock = this.$fromGroup.children('.tips.error');
		}
		;
	},

	// 构造出错提示html
	createErrorHtml : function(error) {
		return $('<span data-error-name="' + error + '">' + error + '</span>');
	}
};