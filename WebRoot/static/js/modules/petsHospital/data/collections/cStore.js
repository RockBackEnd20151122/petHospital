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
    var mStore = require('webtop/models/mStore');
    var WebtopRequest = require('webtop/data/webtopRequest');
    
    /**
     * @constructor
     */
    cStore = Backbone.Collection.extend({
        
        // sync: WebtopRequest.sync,
        
        initialize : function(options) {
        },
        
        fnApiAppPublic: function(params, fnS, fnF){
            WebtopRequest.fnApiAppPublic(params).done(fnS).fail(fnF);
        },
        
        fnApiAppCategory: function(params, fnS, fnF){
            WebtopRequest.fnApiAppCategory(params).done(fnS).fail(fnF);
        },
        
        fnApiAppShow: function(params, fnS, fnF){
            WebtopRequest.fnApiAppShow(params).done(fnS).fail(fnF);
        },
        
        fnApiAppCommentsCreate: function(params, fnS, fnF){
            WebtopRequest.fnApiAppCommentsCreate(params).done(fnS).fail(fnF);
        },
        
        fnApiAppDownload: function(params, fnS, fnF){
            WebtopRequest.fnApiAppDownload(params).done(fnS).fail(fnF);
        },
        
        fnApiAppComments: function(params, fnS, fnF){
            WebtopRequest.fnApiAppComments(params).done(fnS).fail(fnF);
        },
        
        getModels : function(){
            return this.models;
        },
        
        getApps: function(){
            console.log(this)
            console.log(this.models)
            this.models.forEach(function(a, b){
                // console.log('a', a, 'b', b )
            });
        },
        
        parse: function(response) {
            return response.templates;
        }
                
    });

    return cStore;
});
