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

  query_params : function( search_term ) {
    var query_params = {
      query : {
        query_string : {
          query : search_term
        }
      },
      filter : {
        term : {
          account_id : 4
        }
      },
      from : (this.current_page * this.per_page),
      size : this.per_page
    }

    this.current_page++;

    return encodeURIComponent(JSON.stringify( query_params ))
  },

  next_page : function( search_term ) {
    $.ajax({
      url : this.base_url + this.query_params(search_term),
      dataType: 'jsonp',
      success : function(response) {
        SearchResults.add(
          _.map(response.hits.hits, function(element) {
            return element._source
          })
        )
      }
    })
  }

})