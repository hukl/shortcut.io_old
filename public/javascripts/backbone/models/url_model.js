var Url = Backbone.Model.extend({

});

var Urls = Backbone.Collection.extend({
  current_page  : 1,

  url           : function() {
    return '/urls'
  },

  model         : Url,

  next_page : function() {
    this.current_page++

    $.ajax({
      url : '/urls?page=' + this.current_page,
      dataType: 'json',
      success : function( res ) {
        console.log(res.length)
        for (var i=0; i<res.length; i++) {
          console.log("add")
          UrlStore.add(res[i])
        }
      }
    })
  }
});

var Results = Backbone.Collection.extend({

  url           : function() {
    return '/urls'
  },

  model : Url,

  get_results_for : function( options ) {
    $.ajax({
      url       : '/urls/search?query=' + options.query + '&query_type=' + options.query_type,
      dataType  : 'json',
      success   : options.success
    });
  },

  update_matrix : function() {
    UrlStore.each(function(url) {
      url.view.remove()
    })
  }

})