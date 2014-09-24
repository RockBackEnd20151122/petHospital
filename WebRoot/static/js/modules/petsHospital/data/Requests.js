
define(['Util', 'lib/backbone', 'plugins/parameter'], function( Util, Backbone, parameter){
    
    if (window.CONFIG['TEST']) {
        return WebtopDataTest;
    }

    var sessionId;
    if (sessionStorage.sessionId) {
        sessionId = sessionStorage.sessionId;
    }
    
    /**
     * @private
     * @type {String}
     */
    var host =  location.protocol+ '//' + location.host + '/petHospital/';

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
            params.sessionId = sessionId;
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
            var url = host+'servlet/LoginServlet';
            var login = signAndPostRequest( url,params  );
            return login.pipe(function(response){
            	sessionStorage.clear();
                sessionStorage.sessionId = response.sessionId;
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
