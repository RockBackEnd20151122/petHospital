// 给字符串对象表示添加方法，如执行【NS('paf.lib', doSomething);】 equals 【doSomething(console.log(this == paf.lib));】
function NS(name, exec) {
    var names = name.split("."),
        c = window,
        l = names.length,
        i = 0;
    while (i < l) {
        c = (c[names[i]] = c[names[i++]] || {});
    }
    //TODO perhaps make this into an extend??
    exec.call(c);
}

// 判断是不是手机号
function isPhone(p) {
    var s = p.toString().replace(/\s/g, '');
    var pattern = /^1[3458][0-9]{9}$/;
    return pattern.test(s);
}

// 判断是否是合法身份证号码
function isIdCard(s) {
    var patrn;
    if (s.length === 18) {
        patrn = /\d{17}[\dxX]/;
    } else if (s.length === 15) {
        patrn = /[1-9]\d{5}(\d{2})(\d{2})(\d{2})\d{3}/;
    } else {
        return false;
    }
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}

//兼容老代码
function compatibleOldCode(){
    $.isIdCard = isIdCard;
    
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }    
}

// 定义一个校验类，暂时只是一个方法集，公用一些公用参数
var ValidationContext= function(el){
    this.hasError = false;
    this.$el = $(el);
    this.$fromGroup = this.$el.closest('.form-group,li');
    this.$errorBlock = this.$fromGroup.children('.tips.error');
}

ValidationContext.prototype = {
    // 给验证类添加reject方法
    reject : function(errorCont){
        this.hasError = true;
        this.$el.data('errorCont', errorCont);
        this.renderError();
    },

    // 渲染错误
    renderError: function(){
        var errorCont = this.$el.data('errorCont');
        // 显示出错框
        this.showErrorBox();
        //先把内容清空，在emptyError里也有清除
        this.$errorBlock.html('');
        this.createErrorHtml(errorCont).appendTo(this.$errorBlock);
        this.$fromGroup.addClass('error');
    },

    // 清空错误，并隐藏错误显示的容器
    emptyError: function(){
        this.$el.data('errorCont', '');
        clearTimeout(this.$el.data("validationTimeout"));
        if (this.$errorBlock.length >0) {
            this.$errorBlock.html('');
            this.$errorBlock.hide();
        }
        this.$fromGroup.removeClass('error');
    },

    // 显示出错提示容器，如果还没有就先创建并把它赋值给$errorBlock
    showErrorBox: function(){
        if (this.$errorBlock.length > 0) {
            this.$errorBlock.show();
        } else {
            $('<div class="tips error"></div>').appendTo(this.$fromGroup);
            this.$errorBlock = this.$fromGroup.children('.tips.error');
        };
    },
    
    // 构造出错提示html
    createErrorHtml: function(error){
        return $('<span data-error-name="' + error + '">' + error + '</span>');
    }
}

//延迟600毫秒校验，为了改善体验
function validateDelay(el) {
    var $el = $(el);
    $el.data("validationTimeout", setTimeout(function(){ validate(el); }, 600));
}

//实际校验方法
function validate(el){
    var $el = $(el),
        validationContext;
    // 兼容老的代码
    if (!$el.data('hasValidateObj')) {
        validationContext = new ValidationContext(el);
    } else {
        validationContext = $el.data('validateObj');
    }

    $el.data('hasValidateObj', true);
    $el.data('validateObj', validationContext);


    $el.trigger('beforeValidate');
    $el.trigger('validate', validationContext);
    $el.trigger('afterValidate', validationContext);
}


(function($){
    compatibleOldCode();
})(Zepto);

// validator.js中代码copy过来做测试
(function($){
    $.timeDelay = 800; //逻辑待查
    var $form = $('form'),
        $btnSubmit = $form.find('[type="submit"]'),
        $otpSend = $('#otpSend');
        allInputString = 'textarea, input[type="text"], input[type="password"], input[type="tel"], input[type="number"]';

    //加载页面后校验，主要用于用户保存数据的校验，不过这个应该要滞后一些，避免有些该清除字段还未清除
    function validateOnLoad(el){
        var $el = $(el);
        if ($.trim($el.val()) !== '') {
            validate(el);
        }
    }

    //检查allInput（或某个元素之前的元素）是否都校验，如果有某项错误就返回true
    function isValidateHasError(el, container) {
        var hasErrors = false;
        var $validateEl = $form.find(allInputString);
        var currIndex;

        if (el) {
            currIndex = $validateEl.index($(el));
            $validateEl = $validateEl.filter(function(index){ return (index < currIndex); });
        }

        // 如果有容器，即不是检查整个form的input字段
        if (container) {
            $validateEl = $(container).find(allInputString);
        }

        $validateEl.each(function() {
            var $el = $(this);
            //如果字段是隐藏的，就不校验
            if ($el.is(':hidden')) {
                return;
            }

            //跳过银行卡后四位的校验
            if ($el.is('#bankNumberSelect')) {
                return;
            }

            //如果元素还没校验过 或者 如果元素校验过，但有错误
            if (!$el.data('validateObj') || $el.data('validateObj').hasError) {
                hasErrors = true;
                return false;
            }
        });

        return hasErrors;
    }


    //校验前把输入框置为无错误状态，同时排除空字段的情况
    function resetValidateStatus($el){
        if($.trim($el.val()) !== ''){
            $el.data('validateObj').hasError = false;
        } else {
            $el.data('validateObj').hasError = true;
        }
    }

    //设置获取验证码按钮状态
    function setOTPBtnStatus(){
        var hasErrors = isValidateHasError($('#otp\\.otpValue'));
        if (!$otpSend.data('sendOTPCount') || $otpSend.data('sendOTPCount')<=0) {
            if (hasErrors) {
                $otpSend.prop('disabled', true);
            } else {
                $otpSend.prop('disabled', false);
            }
        }
    }

    //设置下一步按钮状态
    function setNextBtnStatus(){
        var $group = $('.group');
        if ($group.length>0) {
            $.each($group, function(){
                var hasErrors, $btnNext;
                if ($(this).find('.next').length > 0) {
                    hasErrors = isValidateHasError('', this);
                    $btnNext = $(this).find('.next');
                    if (hasErrors) {
                        $btnNext.prop('disabled', true);
                    } else {
                        $btnNext.prop('disabled', false);
                    }
                    return false;
                }
            })
        }
    }


    //设置提交按钮点亮相关逻辑
    function setSubmitBtnStatus() {
        var hasErrors = isValidateHasError();
        if (hasErrors) {
            $btnSubmit.prop('disabled', true);
        } else {
            $btnSubmit.prop('disabled', false);
        }
        return false;
    }

    //获取验证码按钮状态
    function setBtnStatus(){
        setSubmitBtnStatus();
        if ($('#otp\\.otpValue').length > 0) {
            setOTPBtnStatus();
        }
        if ($('.group .next').length > 0) {
            setNextBtnStatus();
        }
    }    

    //提交前校验
    function validateBeforeSubmit(e) {
        var hasErrors = isValidateHasError();
        if (hasErrors) {
            e.preventDefault();
            return false;
        }

        // 设置按钮为提交状态
        $btnSubmit.prop('disabled', true).val('正在提交数据...');
    }


    //清除后端返回的错误
    function emptyReturnError(el){
        var $el = $(el),
            $fromGroup = $el.closest('.form-group,li');
            $errorBlock = $fromGroup.children('.tips.error');
        if($errorBlock.length>0){
            this.$errorBlock.html('');
            this.$errorBlock.hide();
        }

        $fromGroup.removeClass('error');

    }

    //银行卡输入提示tips，注意.bankNoDisp的样式化，特别是要注意响应式
    //TODO 这个后绑定不行，待改善，主要表现在失去登录态的找回支付密码时提示没出来
    function addBankNumberTip(){
        var dispDiv = $('<div class="bankNoDisp">1</div>');
        $('[role="bankcard"]').each(function() {
            $(this).before(dispDiv);
        }).on('input.global', function() {
            var val = $(this).val().replace(/(\d{4})/g, '$1' + ' ');
            $(this).prev('.bankNoDisp').html(val).show();
        }).on('blur.global', function() {
            $(this).prev('.bankNoDisp').hide();
        })
    }

    //校验的事件绑定方法
    function handleValidate(){
        //input失去焦点时校验
        // TODO blur事件可以不监听
        $form.on('blur.global', allInputString, function() {
            validate(this);
        });
        //input获得焦点时行为
        $form.on('focus.global', allInputString, function() {
            var $el = $(this);

            // 如果元素已经获得了校验对象
            if ($el.data('hasValidateObj')) {
                $el.data('validateObj').emptyError();
            }

            //如果还不存在validateObj，主要是用于处理后端返回的错误
            if (!$el.data('hasValidateObj')) {
                emptyReturnError($el);
            }

        });

        //input字段输入监听
        $form.on('input.global', allInputString, function(e) {
            e.preventDefault();
            var $el = $(this);
            // 如果元素已经获得了校验对象
            if ($el.data('hasValidateObj')) {
                $el.data('validateObj').emptyError();
            }
            validateDelay(this);
        });


        //加载页面后校验，主要用于用户保存数据的校验，不过这个应该要滞后一些，避免有些该清除字段还未清除
        $(function(){
	        setTimeout(function(){
	            $(allInputString).each(function(){
	                validateOnLoad(this);
	            })
	        }, 50);
        })


        //校验前重置校验状态
        $form.on('beforeValidate.global', allInputString, function(e){
            var $el = $(this);
            resetValidateStatus($el);
        });

        //校验后设置提交按钮状态
        $form.on('afterValidate.global', allInputString, setBtnStatus);
        //表单提交时逻辑
        $('form').on('submit.global', validateBeforeSubmit);
    }

    function init(){

        addBankNumberTip();
        handleValidate();
    }

    //初始化
    init();
})(Zepto);
//获取QueryString的数组

function getQueryString(){
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
    for(var i = 0; i < result.length; i++){
         result[i] = result[i].substring(1);
    }
    return result;
}

//根据QueryString参数名称获取值
function getQueryStringByName(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
         return "";
    }
    return result[1];
}


//后退功能，添加了有cancelUrl、returnUrl的逻辑，在页面中有约定的input type="hidden"的元素  
// 20140522 把cancelUrl、returnUrl调整至mata-data ,所有页面都可以获取，不再使用该方法;返回商户的逻辑只存在于登录首页和收银台
// prevUrl 表示上一个页面的url，直接定义在页面中id=prevUrl的隐藏域中
// appCancelUrl 手机壹钱包找回密码时，用queryString方式传到H5的返回Url
function goback(){
    var cancelUrl, prevUrl, appCancelUrl;
    appCancelUrl = decodeURIComponent(getQueryStringByName('cancelUrl'));
    // 回退功能
    if ($('#prevUrl').length>0) {
    	prevUrl = $('#prevUrl').val();
    }
    if ($('#cancelUrlBox').length>0) {
        cancelUrl = decodeURIComponent($('#cancelUrlBox').val());
    }
    if (cancelUrl){
        window.location.href = cancelUrl;
        return false;
    }else if(appCancelUrl){
        window.location.href = appCancelUrl;
        return false;
    }else if(prevUrl){
    	window.location.href = prevUrl;
    	return false;
    }
}

//暂时没想到该放什么地方的逻辑
(function($){
    //返回按钮行为
    $('body').on('tap.global','.goBack:not(.close)', goback);
    //弹出框相关逻辑
    $('body').on('tap.global', '.pop,.dialog', function() {
        $(this).remove();
    });
})(Zepto);