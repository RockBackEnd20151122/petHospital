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
 * @deprecated 
 */
define(function(require) {

    var Backbone = require('lib/backbone');
    var mNotif = require('webtop/models/mNotif');
    var WebtopRequest = require('webtop/data/webtopRequest');

    /**
     * The home page shortcut collection.
     * @constructor
     */
    cNotif = Backbone.Collection.extend({
        model : mNotif,
        initialize : function(models, options) {
            // this.addNotif(json);
        },
        addNotif : function(json) {
        },
        domWeaver:function(models){
            models.each(function(book) { });
        }
    });
/*
    var notif1 = new mNotif({
        "app" : {
            "count" : 0
        }
    });
    var notif2 = new mNotif({
        "app" : {
            "count" : 0
        }
    });
    var notif = new cNotif;
    notif.add(notif1);
    notif.add(notif2);
    notif.remove(notif2);
    // var notif = new cNotif([notif1, notif2,]);
    */

/*
    notif.bind('reset', showAll);
    notif.fetch({
        url : '/getbooks/', 
        success : function(collection, response) {
            collection.each(function(book) {
                alert(book.get('title'));
            });
        },
        error : function() {
            alert('error');
        }
    });
    showAll = function() {
         // for (var i = 0; i < notif.models.length; i++) {
         // alert(notif.models[i].get('title'));
         // }
         
        notif.each(function( notification) {
        });
    }
    */
    return cNotif;
});
