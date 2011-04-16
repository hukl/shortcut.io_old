var Url = Backbone.Model.extend({

});

var Urls = Backbone.Collection.extend({
  current_page  : 0,

  url           : function() {
    this.current_page++;
    return '/urls?page=' + this.current_page
  },
  model         : Url


});