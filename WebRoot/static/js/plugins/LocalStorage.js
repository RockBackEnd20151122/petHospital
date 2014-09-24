/**
 * the class of localStorage
 */
define(function() {
	var oStorage = {},
		fnStorage = function(){};
	try{
		oStorage = window.localStorage?window.localStorage:window.globalStorage[strDomain];
	}catch(e){
		console.log(e.message?e.message:e.toString());
	}
	if(b){
		window.onstorage = function(e){
			fnStorage&& fnStorage();
			console.log('oStorage changed：');
			console.log('changed key:'+ e.key );
			console.log('the old value of changed key:'+ e.oldValue );
			console.log('the changed key\'s value now is'+ e.key );
			console.log('changed key\'s url is :'+ e.url );
			console.log('the changed storage obj is:' + e.storageArea);
		};
	}
	return {
		storage: function(){
			return oStorage;
		},
		/**
		 * get the value of specific key
		 * @param key
		 * @returns
		 */
		get : function(key) {	
			var result;
			if (oStorage.getItem(key) != undefined
					&& oStorage.getItem(key) != null) {
				result = JSON.parse(oStorage.getItem(key));
			}
			return result;
		},
		/**
		 * add the value of specific key to value: 
		 * 				if no key ,then add new one; if has the key ,then update the value
		 * @param key
		 * @param value
		 * @returns
		 */
		set : function(key, value) {
			if (!!key && !!value) {				// 判断是否传递Key值过来如果没有 则不进行添加
				oStorage.setItem(key, JSON.stringify(value));
				return true;
			} else {
				return false;
			}
		},
		/**
		 * remove the only key and value by the key 
		 * @param key
		 * @returns
		 */
		remove : function(key) {
			oStorage.removeItem(key);
		},
		/**
		 * clear up all value of the key
		 * @returns
		 */
		clear: function(){
			oStorage.clear();
		},
		setUpdate: function(fnUpdate){
			fnStorage = fnUpdate;
		}
	};
});