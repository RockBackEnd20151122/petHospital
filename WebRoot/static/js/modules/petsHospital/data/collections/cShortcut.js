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
    var Shortcut = require('webtop/models/mShortcut');
    var WebtopRequest = require('webtop/data/webtopRequest');

    /**
     * The home page shortcut collection.
     * @constructor
     */
    var ShortcutCollection = Backbone.Collection.extend({

        model: Shortcut,

//        comparator: function(shortcut) {
//            return shortcut.get('location');
//        },
        
//        lastLocation: function(){
//            if (!this.length) return 0;
//            return this.last().get('location');
//        },
        
//        apps : function() {
//            return this.filter(function(shortcut){ return shortcut.getType() == 'app'; });
//        },
        /**
         *  replace
         */
        replace: function(p,fnS,fnF){
            WebtopRequest.fnDesktopMove(p)
                .done(fnS.bind(this))
                .fail(fnF.bind(this));
        },

        findByEntityId: function(entityId) {
            return this.find(function(shortcut) {
                return shortcut.getEntity().id.toString() === entityId.toString();
            });
        }
    });

    return ShortcutCollection;
});
