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
 * @author: Rock
 *
 */
define(function(require) {

    var Backbone = require('lib/backbone');
    var mNotifList = require('webtop/models/mNotifList');
    var WebtopRequest = require('webtop/data/webtopRequest');
    /**
     * The home page shortcut collection.
     * @constructor
     */
    cNotifList = Backbone.Collection.extend({
        
        model : mNotifList ,

        initialize : function(options) {
            _.bindAll(this);
            this.on('empty', this.empty );
            if(options.bOccasional)return;
            this.bind("add", options.view.addNotifItem);
        },
        
        fnApiNotification : function( jp, fnS, fnF) {
            WebtopRequest.fnApiNotification( jp).done(fnS).fail(fnF);
        }
        
        ,fnApiNotificationEmpty : function( jp, fnS, fnF){
            WebtopRequest.fnApiNotificationEmpty( jp).done(fnS).fail(fnF);
        }
        
        ,fnNotificationInteract : function( jp, fnS, fnF){
            WebtopRequest.fnNotificationInteract( jp).done(fnS).fail(fnF);
        }
        
        ,fnFriendshipsConfirm : function( jp, fnS, fnF){
            WebtopRequest.fnFriendshipsConfirm( jp).done(fnS).fail(fnF);
        }
        
        ,fnNotificationConfirm : function( jp, fnS, fnF){
            WebtopRequest.fnNotificationConfirm( jp).done(fnS).fail(fnF);
        }
        
        ,fnApiNnotificationDestroy : function( jp, fnS, fnF){
            WebtopRequest.fnApiNnotificationDestroy( jp).done(fnS).fail(fnF);
        }
        
        ,fnApiUserProfileappReceive : function( jp, fnS, fnF){
            WebtopRequest.fnApiUserProfileappReceive(jp).done(fnS).fail(fnF);
        }
        
        ,fnApiAppReceive : function( jp, fnS, fnF){
            WebtopRequest.fnApiAppReceive( jp).done(fnS).fail(fnF);
        }
        
        ,refresh : function(){
            console.log('TODO:refresh')
        }
        
        ,empty: function(t){return;
            alert(t||'clear');
        }
    });

    return cNotifList;
});
