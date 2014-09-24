
define(['Util', 'lib/backbone'], function( Util, Backbone){
    
    if (window.CONFIG['TEST']) {
        return WebtopDataTest;
    }

//    var Util = Util.create();

    var sessionId;
    if (sessionStorage.session_id) {
        sessionId = sessionStorage.session_id;
    }
    
    /**
     * @private
     * @type {String}
     */
    var host = 'http://'+ location.host + '/ACenter/';

    /**
     * Signs the parameters and sends the request
     * @private
     * @memberOf {WebtopRequest}
     * @param {String} url
     * @param {Object} params
     * @returns {jQueryDeferred} request promise
     */
    var signAndPostRequest = function(url, params ) {
        if (!params) {
            params = {};
        }
        if (sessionId) {
            params.session_id = sessionId;
        }
        var signedParams = Util.signparams(params,'json',parameter);
        return Util.fnPostRequest(url, signedParams );
    };

    Backbone.emulateHTTP = true;

    var Request = {
        /**
         * @return {String}
         */
        getHost: function() {
            return host;
        },
        sync: function(method, model, options) {
            options.data.session_id = sessionId;
            options.data = Util.signparams(options.data,'json',parameter);
            options.type = 'POST';
            return Backbone.sync(method, model, options); // create = hack for POST
        },
        fnLogin: function(params ){
            var url = host+'/petHospital/servlet/LoginServlet';
            var login = signAndPostRequest( url,params  );
            return login.pipe(function(response) {
            	sessionStorage.clear();
                sessionStorage.session_id = response.session_id;
                sessionStorage.uid = response.user.id;
                sessionStorage.avatar = (response.user.avatar_url?response.user.avatar_url:'../img/logo.png');
                sessionId = response.session_id;					//XXX:???	TODO:delete it
                return response;
            });
        },
        fnApiAccountPendingCreate: function(params ){
            var url = host+'api/account/pending/create';
            var request = signAndPostRequest( url,params  );
            return request.pipe(function(response) {
            	sessionStorage.clear();
                sessionStorage.session_id = response.session_id;
                sessionStorage.uid = response.uid;
                //sessionStorage.avatar = (response.user.avatar_url?response.user.avatar_url:'../img/logo.png');
                sessionId = response.session_id;					//XXX:???	TODO:delete it
                return response;
            });
        },
        fnApiAccountPendingRegister: function(params ){
            var url = host+'api/account/pending/register';
            return request = signAndPostRequest( url,params  );
        }
    };
    return Request;
});
