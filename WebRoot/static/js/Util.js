/**
 * @author:Rock
 */
define( function(require){
    	
    //TODO:control the memory of util.child;
	var $=require('lib/jquery');

	return util = {
    	fnPostRequest: function( url,params,fnS,fnF ){
    		return util.fnAjax('post',url,params,fnS,fnF);
        },
        fnGetRequest: function( url,params,fnS,fnF ){
            return util.fnAjax('get',url,params,fnS,fnF);
        },
        fnAjax: function( method,url,params,fnS,fnF ){
        	return $.ajax({
                url: url,
                type: method,
                data: params,//$.signparams(params,'json'),
                dataType: "json",                             
			                // dataType:'jsonp',
			                // jsonp: "callbackparam",
			                // jsonpCallback:"success_jsonpCallback",
                success : function(data){
                    if(data.responseCode === "0000"){
                    	fnS&& fnS(data);
                    } else {
                    	fnF&& fnF(data); // $("#login #msg").text(data.describe);
                    }
                },
                complete: function(){
                	params.fnComplete&& params.fnComplete();
                }
            }).pipe(function(response) {
            	if(response.responseCode =='9999'){		//means session timeout
        		}
                if (response.responseCode !== "0000"){
                    
                    console.log('Error: ' + response.describe);

                    return new $.Deferred()/*.reject(response.describe)*/.promise();
                }
                return response;
            });
        },
        signparams: function(params, format, parameter){
            //TODO:sessionId; 
            //TODO:jQuery object change;
            if($.sessionId){
                params.session_id = $.sessionId;
            };
            return parameter.sign(params, format);
        },
        markName: function(arr){
			arr.shift();
			return arr.join('');
		},
        bankNumberFormat: function(options){				//TODO: format bank number
            var dispDiv = '' ;
            $(options.className).each(function(){
                $(this).before('<div class="bankTip"> </div>');
                dispDiv = $(this).prev('.bankTip');
            }).on('input change', function(){
            	$(this).val($(this).val().replace(/\D/g,''));
            	var val = $(this).val();
            	var value = $(this).val().replace(/(\d{4})/g, '$1 ');
                if (val.length > 15) {
                	options.readyForNext && options.readyForNext();
                	dispDiv.html(value).show();
				}else if(val.length<=0){
					options.prepareForNext && options.prepareForNext();
                	dispDiv.hide();
                }else{
                	options.prepareForNext && options.prepareForNext();
                	dispDiv.html(value).show();
                }
            }).on('blur', function() {
            	dispDiv.hide();
            });
            return dispDiv;
        },
        getUrlParams: function(){
      	   var url = location.search;			// ?paramA=aaa&paramB=bbb
     	   var theRequest = {};
     	   if (url.indexOf("?") != -1) {
     	      var str = url.substr(1);
     	      strs = str.split("&");
     	      for(var i = 0; i < strs.length; i ++) {
     	         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
     	      }
     	   }
     	   return theRequest;
     	},
     	/**
     	 * @param time
     	 * @param $dom
     	 * @param fn
     	 * @returns
     	 * 
     	 *  _t.getCode = $('.js_getRegisterCodeReal');
     	 * 	_t.cleanInterval = Util.getOtpTimeout(59, _t.getCode, function(){
				_t.getCode.val("重新获取").removeClass("color_999");
				_t.smsCodeBool = false;
				_t.phone.removeAttr("readonly");
			});
     	 */
     	getOtpTimeout: function(time, $dom, fn){
        	$dom.data('buttonText', $dom.val());
        	var fnClean = function(func){
        		$dom.val($dom.data('buttonText')).removeAttr('disabled');
            	fn&&fn();
            	func&&func();
            	clearInterval(interval);
        	};
			$dom.val(time+"s");
        	$dom.prop('disabled',true);
        	var interval = setInterval(function(){
            	if(time>0){
                    var t = time--;
            		$dom.val(t+"s");
            		return;
            	}
            	fnClean(fn);
            },1000);
        	return fnClean;
        },
        getAmountFormat: function(amount){
            var amountF = (parseFloat(amount)/100).toFixed(2);
            var amountArr = amountF.split('.');
            return amountArr[0] + ".<sup>"+amountArr[1]+"</sup>"; 

        },
        loadStyle: function(id, href){//<link rel="stylesheet" href="../css/popup.css" />
            var style = $('<link type="text/css" id="'+id+'" rel="stylesheet" href="../css/'+href+'" />');
            $('head').append(style);
        },
        getOffset : function(e) {
        	if(!e)return;
            var t = e.offsetTop;
            var l = e.offsetLeft;
            var w = e.offsetWidth;
            // var h = e.offsetHeight - 2;

            var h = e.offsetHeight;

            /** while have some parent Nodes
             */
            while ( e = e.offsetParent) {
                t += e.offsetTop;
                l += e.offsetLeft;
            }
            return {
                top : t,
                left : l,
                width : w,
                height : h
            };
        },
        getTimestamp: function(){
        	return new Date().getTime();
        }
    };
});