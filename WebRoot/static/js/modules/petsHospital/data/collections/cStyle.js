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
    var mStyle = require('webtop/models/mStyle');
    var WebtopRequest = require('webtop/data/webtopRequest');
    
    /**
     * @constructor
     */
    cTemplate = Backbone.Collection.extend({

        model : mStyle ,

        url: WebtopRequest.getHost() + 'api/app/style',
        sync: WebtopRequest.sync,

        initialize : function(models, options) {
        },

        parse: function(response) {
            return response.styles;
        }
        
    });

    return cTemplate;
});
