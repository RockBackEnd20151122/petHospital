/*******************************************************************************
 * ABLE AGENIOS LIMITED CONFIDENTIAL
 * _________________________________
 * 
 *  [2010] - [2013] Able Agenios Ltd 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Able Agenios Ltd  and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Able Agenios Ltd 
 * and its suppliers and may be covered by French and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Able Agenios Ltd.
 ******************************************************************************/

define(function (require) {

    var $ = require('lib/jquery');
    var WebtopRequest = require('webtop/data/webtopRequest');

    /**
     Singleton which handles requests relative to the user session.
     Must implement player\session\IUserSession.
     */
    return {

        /**
         * Get an app layout.
         * @param {String} id
         * @return {jQueryDeferred} resolving the layout document
         */
        getApp: function (id) {
            var params = {};
//            params['app_id'] = id;
//            return WebtopRequest.fnApiAppShow(params);
            params['version_id'] = id;
            return WebtopRequest.fnApiAppLayoutShow(params).pipe(function(response) {
                return $.parseXML(response.layout);
            });
        },

        /**
         * Create a new app.
         * @param {String} name
         * @param {String} [appDesc]
         * @return {jQueryDeferred} resolving the response
         */
        createNewApp: function (name, appDesc) {
            var params = {};
            params['label'] = name;
            if (appDesc) {
                params['layout'] = appDesc;
            }
            params['path'] = 'webtop';
            return WebtopRequest.fnApiAppCreate(params);
        },
        /*
         saveNewApp: function (name, appDesc) {
         var toReturn;
         var params = {};
         params['label'] = name;
         params['layout'] = appDesc;
         params['path'] = 'webtop';
         return WebtopRequest.fnApiAppCreate(params).pipe(function(response) {
         toReturn = response;
         params = {};
         params['having_id'] = response['having_id'];
         params['path'] = 'apptop';
         return WebtopRequest.fnDesktopAdd(params);
         }).pipe(function() {
         return toReturn;
         });
         },
         */

        /**
         * Save an existing app.
         * @param {String} appId
         * @param {String} appVersionId
         * @param {String} name
         * @param {String} appDesc
         * @param {String} icon
         * @return {Deferred} resolving the response
         */
        saveApp: function (appId, appVersionId, name, appDesc, icon) {
            var params = {};
            params['app_id'] = appId;
//            params['version'] = appVersionId;
            if (name) {
                params['label'] = name;
            }
            if (icon) {
                params['icon'] = icon;
            }
            params['layout'] = appDesc;
            return WebtopRequest.fnApiAppUpdate(params);
        },

        /**
         * Get a new app template.
         * @param {String} id
         * @return {Deferred} resolving the template document
         */
        getTemplate: function (id) {
            var params = {};
            params['template_id'] = id;
            return WebtopRequest.fnApiAppTemplateShow(params).pipe(function(response) {
                return $.parseXML(response.template.layout);
            });
        },

        /**
         * Get an app style.
         * @param {String} name
         * @param {String} type
         * @return {Deferred} resolving the style document
         */
        getStyle: function (name, type) {
            var params = {};
            params['label'] = name;
            params['type'] = type;
            return WebtopRequest.fnApiAppStyleShow(params).pipe(function(response) {
                return $.parseXML(response.style.layout);
            });
        },

        destroyApp: function(appId) {
            var params = {};
            params['app_id'] = appId;
            return WebtopRequest.fnApiAppDestroy(params).pipe(function(response) {
                return response;
            });
        },

        /**
         * Get the user session id, needed to open app session
         * @return {String}
         */
        getSessionId: function () {
            return window.sessionStorage.session_id;
        },

        /**
         * Get the baseUrl for style resources
         * @return {String}
         */
        getResourcesUrl: function () {
//            return 'http://' + document.location.host + '/ACenter/res/';
            return WebtopRequest.getHost() + 'res/app/';
        },

        /**
         * Get the username (needed for record)
         * @return {String}
         */
        getUserId: function () {
            return sessionStorage.uid;
        }
    };
});
