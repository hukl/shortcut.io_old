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
        UrlStore.add(res)
      }
    })
  }
});

var Results = Backbone.Collection.extend({
  current_page  : 0,
  per_page      : 30,
  base_url      : 'http://localhost:9200/urls/_search?source=',

  url           : function() {
    return '/urls'
  },

  model : Url,

  next_page : function( search_term ) {
    $.ajax({
      url : '/urls/search?' + 'search_term=' + search_term + '&page=' + this.current_page,
      dataType: 'json',
      success : function(response) {
        if (SearchResults.current_page == 0) {
          SearchResults.refresh(
            _.map(response, function(element) {
              return element._source
            })
          )
        } else {
          SearchResults.add(
            _.map(response, function(element) {
              return element._source
            })
          )
        }

        SearchResults.current_page++;
      }
    })
  }

})