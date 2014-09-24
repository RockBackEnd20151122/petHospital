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
    var mSearch = require('webtop/models/mSearch');
    var WebtopRequest = require('webtop/data/webtopRequest');
    
    // url for fetch model
    var Url = '';                            //TODO:receive POST，GET，PUT，DELETE request and separate them in server

    /**
     * @constructor
     */
    cNotif = Backbone.Collection.extend({
        url: Url ,
        model : mSearch ,
        initialize : function(models, options) {
            // this.addS(json);
        },
        fnReset: function(){
            this.model.fetch({
                    url : Url,
                    success : function(model, response) {
                        alert(model.get('search'));
                    },
                    error : function() {
                        alert('error');
                    }
                });
        },
        addS: function(json) {
        },
        weavDom:function( models){
            models.each(function(book) { });
        }
    });

    return cNotif;
});
