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

/**
 * Created with JetBrains WebStorm.
 * User: ade
 * Date: 23/01/13
 * Time: 16:20
 * To change this template use File | Settings | File Templates.
 */

define(function(require) {
	
    var $ = require('lib/jquery');
    var _ = require('lib/underscore');
    var Backbone = require('lib/backbone');

    /**
     * The homescreen router
     * @constructor
     */
    var HomeRouter = Backbone.Router.extend({

        routes: {
            'app/:id': 'app',
            'app/:id/:aId': 'app2',
            'profile/:aId': 'profile',
            'friends/:aId': 'friends',
            'container/:aId': 'container',
            'store/:aId': 'store'
        },

        initialize: function(options) {
            this.view = options.view;
            // this.route("app/:id", "app", function(id){
                // this.app();
            // });
        },

        app: function(id) {
            this.view.showApp(id);
        },
        
        /**
 * @deprecated  
 * @param {Object} id
 * @param {Object} aId
         */
        app2: function(id, aId) {
            this.view.showApp(id, aId);
        },
        /**
 * @deprecated  
 * @param {Object} aId
         */
        
        profile: function(aId) {
            this.view.showProfile(aId);
        },
        
        friends: function(aId) {
            this.view.showFriends(aId);
        },
        
        store: function(aId) {
            this.view.showStore(aId);
        },
        
        container: function(aId) {  return;
            this.view.showContainer(aId);
        }

    });

    return HomeRouter;
});
