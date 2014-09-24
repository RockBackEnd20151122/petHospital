(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['person'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<table>\r\n    <tr>\r\n        <td>This is "
    + escapeExpression(((helper = helpers.firstname || (depth0 && depth0.firstname)),(typeof helper === functionType ? helper.call(depth0, {"name":"firstname","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = helpers.lastname || (depth0 && depth0.lastname)),(typeof helper === functionType ? helper.call(depth0, {"name":"lastname","hash":{},"data":data}) : helper)))
    + "</td>\r\n    </tr>\r\n</table>";
},"useData":true});
})();