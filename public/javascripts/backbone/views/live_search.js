$(document).ready(function() {

  window.SearchResults = new Results;

  window.LiveSearch = Backbone.View.extend({
    el : $('#live_search'),

    events : {
      'keyup' : 'handle_input'
    },

    initialize : function() {
      this.search_results = $('#search_results');
      this.search_timeout = undefined;

      _.bindAll(this, 'handle_input');
    },

    render : function() {
      return this;
    },

    current_value : function() {
      return $('#live_search').val();
    },

    handle_input : function(event) {
      switch( event.which ) {
        case 13:
          break;
        case 27:
          $('#search_results').hide()
          break;
        case 38:
          this.select_prev();
          break;
        case 40:
          this.select_next();
          break;
        default:
          this.search_with_timeout();
          break;
      }
    },

    search_with_timeout : function() {
      if ( this.search_timeout != undefined ) {
        clearTimeout(this.search_timeout);
      }

      this.search_timeout = setTimeout(this.get_results, 500)
    },

    get_results : function() {
      var base_url      = 'http://localhost:9200/urls/_search?source=',
          search_term   = $('#live_search').val();

      if (_.isEmpty(search_term)) {
        SearchResults.refresh([])
        UrlStore.trigger('refresh')
      } else {
        query_params = {
          query : {
            query_string : {
              query : search_term
            }
          },
          filter : {
            term : {
              account_id : 1
            }
          },
          size : 30
        }

        $.ajax({
          url : base_url + encodeURIComponent(JSON.stringify(query_params)),
          dataType: 'jsonp',
          success : function(response) {
            SearchResults.refresh(
              _.map(response.hits.hits, function(element) {
                return element._source
              })
            )
          }
        })
      }
    }
  })

  new LiveSearch

})