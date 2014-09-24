define(function(require){
	return SessionStorage = {
		// 获得缓存
		get : function(key) {
			var result;
			if (sessionStorage.getItem(key) != undefined
					&& sessionStorage.getItem(key) != null) {
				result = JSON.parse(sessionStorage.getItem(key));
			}
			return result;
		},
		// 缓存添加
		add : function(key, value) {
			if (!!key && !!value) {
				// 判断是否传递Key值过来如果没有 则不进行添加
				sessionStorage.setItem(key, JSON.stringify(value));
				return true;
			} else {
				return false;
			}
		},
		remove : function(key) {
			sessionStorage.removeItem(key);
		}
	};
});