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
    var mFriends = require('webtop/models/mFriends');
    var WebtopRequest = require('webtop/data/webtopRequest');

    /**
     * The home page shortcut collection.
     * @constructor
     */
    cFriends = Backbone.Collection.extend({

        model : mFriends,

        initialize : function(options) {
            
            _.bindAll(this);
            
            this.on('empty', this.clear );
            if(options.bOccasional)return;
            // this.fnFriendshipsGroups(options.fnSSFriendshipsGroups, options.fnFFriendshipsGroups);

            // this.fnFriendshipsFriends( options.view.fnSFriendshipsFriends, options.view.fnFFriendshipsFriends );
        },
        
        fnFriendshipsFriends : function(fnS, fnF, fn, $this) {                              // get the info of friends list
            return WebtopRequest.fnFriendshipsFriends({}).done(fnS).fail(fnF);
            // fn&&fn.call($this, this.attributes);        },
        
        fnFriendshipsGroups : function(fnS, fnF, fn, $this) {                              // get the info of group list
            WebtopRequest.fnFriendshipsGroups({}).done(fnS).fail(fnF);
            fn&&fn.call($this, this.attributes);
        },
/*
        fnFriendshipsGroupsMembers: function(jp, fnS, fnF, fn, $this){                     //Get the specific friend group users
            WebtopRequest.fnFriendshipsGroupsMembers(jp).done(fnS).fail(fnF);
            fn&&fn.call($this, this.attributes);
        },*/
        fnFriendshipsGroupsMemberAdd: function(jp, fnS, fnF){
            WebtopRequest.fnFriendshipsGroupsMemberAdd(jp).done(fnS).fail(fnF);
        },
        
        fnFriendshipsDestroy : function(jp,fnS, fnF){
            WebtopRequest.fnFriendshipsDestroy(jp).done(fnS).fail(fnF);
        },
        
        fnApiSearchGo : function(jp,fnS, fnF){
            WebtopRequest.fnApiSearchGo(jp).done(fnS).fail(fnF);
        },
        
        fnNotificationSend : function(jp,fnS, fnF){
            WebtopRequest.fnNotificationSend(jp).done(fnS).fail(fnF);
        },
        
        domWeaver : function(models) {
            models.each(function(book) { });
        },
        
        clear       : function() {
            this.each(function(friend){friend.trigger('clear')});
            this.reset();
            return this;
        },
        
        fnTest: function(t){
            alert(t)
        }
    });

    return cFriends;
});
