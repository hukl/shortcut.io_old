var Url = Backbone.Model.extend({
  url : function() {
    return '/urls/'+ this.id
  }
});

var Urls = Backbone.Collection.extend({
  current_page  : 0,

  url           : function() {
    this.current_page++;
    return '/urls?page=' + this.current_page
  },
  model         : Url


});