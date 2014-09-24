

define(['require','lib/jquery','lib/jquery-md5'], function(require, $){ 
    // require('util/jquery-md5');
    var params = 
    {
        sign : function(params, format) {
            var params = this.append_system_params_exclude_sign(params, format);
            params = this.add_sign_param(params);
            return params;
        },
        
        encryt_password: function(password){
            return $.md5(password);
        },
        
        append_system_params_exclude_sign: function(params, format) {
            params.sign_method = 'md5';
            if(format){
                params.format = format;
            }
            params.time = this.get_time();
            return params;
        },
        
        get_time: function(){
            return new Date().getTime();
        },
        
        add_sign_param: function(params){
            var md5 = this.md5_parames(params);
            params.sign = md5;
            return params;
        },
        
        md5_parames: function(params) {
            var params_sort = this.sort_parames(params);
            var encryption = "";
            for(var v in params_sort){
                encryption += params_sort[v];
            }
            return $.md5(encryption);
        },
        
        sort_parames: function(params) {
            var params_array = new Array();
            for(var name in params){
                params_array.push(name+"="+params[name]);
            }
            params_array.sort();
            return params_array;
        },
    };
    
    return params;
        
});
