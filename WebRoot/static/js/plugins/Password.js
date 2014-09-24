define('Password', [], function(){
	//rCharsCount[0] rCharsCount[1]  rCharsCount[2]  rCharsCount[3] 为合法字符，非这些字符，则为不合法字符
	var rCharsCount = [
	                  [/[A-Z]/, 26],
	                  [/[a-z]/, 26],
	                  [/[0-9]/, 10],
	                  [/[~!\@\#\$\%\*\^\&\(\)\;.?\<\>\\_\/\-`]/, 21]
	                  ], 
    rValid = /[^A-Za-z0-9~!\@\#\$\%\*\^\&\(\)\;\<\>.?\\_\/\-`]/, 
    maxEntropy = (Math.log(83)/Math.LN2), 
    midLength = 11,
	greyWordList = "1234qwer,Pass1234,qwer1234,1qaz2wsx,000000,111111,11111111,112233,123123,123321,123456,12345678,654321,666666,888888,abcdef,abcabc,abc123,a1b2c3,aaa111,123qwe,qwerty,qweasd,admin,password,p@ssword,passwd,p@sswd,pa$$wd,pas$wd,pa$swd,iloveyou,5201314,password,123456,12345678,qwerty,abc123,monkey,1234567,letmein,trustno1,dragon,baseball,111111,iloveyou,master,sunshine,ashley,bailey,passw0rd,shadow,123123,654321,superman,qazwsx,michael,football".split(",");
	var Password = {
		entropyScore: function(v) {
			var i = 0, n = 0;
			for ( ; i < rCharsCount.length; i++ ) {
				if (rCharsCount[i][0].test(v)) {
					n+=rCharsCount[i][1];
				}
			}
			// basic entropy calculation, if we wish to have even more strength
			// we should take into account of substituable characters
			// and also take into account of repeating characters, nearby characters and such
			return ((((Math.log(n)/Math.LN2)*v.length)/(maxEntropy*10)))*60;
		},
		testGreyList: function (v) {
			for ( var i = 0; i < greyWordList.length; i++ ) {
				// for now use this very primitive method, data not large enough for any sort of optimised techniques
				if ( v.indexOf(greyWordList[i]) > -1 ) {return true;}
			}
			return false;
		},
		// 有效字母包含大写字母，小写字母，数字，特殊符号
	    validCharSet: function(v) {
	        return !rValid.test(v);
	    },
	    // 必须两种组合以上
	    groupScore: function(v){
	        var i = 0, n = 0;
	        for ( ; i < rCharsCount.length; i++ ) {
	            if (rCharsCount[i][0].test(v)) {
	                n+=1;
	            }
	        }
	        return n;
	    },
	    validCharSetGroup: function(v) {
			return (!rValid.test(v)) && (Password.groupScore(v) >= 2);
		},
		lessLength: function(v, num){
			var value = v || "", num = num || 6;
			return value.length<num;
		},
		moreLength: function(v){
			var value = v || "";
			return value.length>16;
		},
		getPwdStrength: function(el,l){
			var val = $(el).val(),status = false;
			if(val==""||!Password.validCharSet(val)){
				return {status:1,mark:'请输入密码!'};							//1. 去填password
			}
			if ( this.testGreyList(val)) {				//2. 填了灰名单里的段
				return {status:3,mark:'您的密码不能属于灰名单!'};
			}
			if(val.length<(l||6) ||val.length>16){
				return {status:2,mark:'密码必须在'+(l||'6')+'位到16位之间!'};
			}
			var score = Password.entropyScore(val), mark = 0;
			if ( isNaN(score)) {
				mark = 'D';		// 坑爹了
				return {status:4,mark:'密码非数!'};
			}else if ( score < 35) {
				mark = 'C';		// 弱
				status = true;
			}else if ( score < 60 ) {
				mark = 'B';		// 中
				status = true;
			}else {
				mark = 'A';		// 强
				status = true;
			}
			return {status:status,mark:mark};						// mark 为实名强度
		}
	};
	return Password;
});