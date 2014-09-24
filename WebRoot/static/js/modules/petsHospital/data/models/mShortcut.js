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

define(function(require) {

    var Backbone = require('lib/backbone');

    /**
     * A shortcut (app, profile, store)
     * @constructor
     */
    var Shortcut = Backbone.Model.extend({

        defaults: {
            //icon_url: '/res/icon/generic.png',
            icon_url: '/ACenter/res/icon/generic.png',
            label: null,
            location: null,
            having:null
            // ,            entity: null
        },
        
        initialize: function() {
            // if (!this.get("icon_url")) {
                // this.set({"icon_url": this.defaults.icon_url});
              // }
        },
        
        clear: function() {
            this.destroy();
        },
        
        getEntity: function() {
            return this.get('having').entity;
        },

        getType: function() {
            return this.getEntity().type;
        },

        /**
         * Tells if this shortcut points to an app.
         * @return {Boolean}
         */
        isAppType: function() {
            var appType;
            var type = new RegExp(this.getEntity().type);
            if (type.test('myprofile') || type.test('friends') || type.test('store')) {
                appType = true;
            } else if (type.test('app') /*&& window.sessionStorage.uid && (this.getEntity().creator.id == window.sessionStorage.uid)*/) {
                appType = true;
            } else {
                appType = false;
            }
            return appType;
        },
        
        /** @return : is  my own application
         */
        isOwn: function(){
            return this.getEntity().creator.id===sessionStorage.uid
        },

        /**
         * Returns the id of the app represented by this shortcut.
         * @return {String}
         */
        getAppId: function() {
            if (this.isAppType()) {
                return this.getEntity().app_id;
            } else {
                this.trigger('error', 'trying to get the appId of a non-app shortcut.')
                return null;
            }
        }
    });

    return Shortcut;
});
