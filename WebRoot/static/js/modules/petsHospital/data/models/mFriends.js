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
 *  @author: Rock
 */
define(function(require) {
    var _ = require('lib/underscore');
    var Backbone = require('lib/backbone');
    var WebtopRequest = require('webtop/data/webtopRequest');

    var mFriends = Backbone.Model.extend({
        // url : Url,

        defaults : {
            // "id" : "10083",
            // "username" : "webtop03",
            // "first_name" : "",
            // "last_name" : "",
            // "gender" : "0",
            // "mail" : "jlrnqhb@126.com",
            // "avatar_url" : "http:\/\/140.206.112.78:8006\/res\/images\/user\/avatar\/a6c96a5da9ddbee66352303f86d9601f.jpg",
            // "status" : "1",
            // "friends_group_id" : null,
            // "description" : null
            
            // 'status1': true,
            // 'status2': true,
            // 'status3': true,
            // 'status4': true,
            // 'status5': true
        },

        initialize : function() {
            _.bindAll(this);
        },
        
        clear: function() {
            this.destroy();
        }
        
        ,fnTest : function() {
            alert('mFriends test fn!')
        }
    });
    return mFriends;
});
