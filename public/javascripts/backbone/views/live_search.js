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
      this.current_value = "";

      _.bindAll(this, 'handle_input');
    },

    render : function() {
      return this;
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

    input_value_has_changed : function() {
      this.current_value === $('#live_search').val();
    },

    get_results : function() {
      var search_term   = $('#live_search').val();

      if (Search.current_value != search_term) {
        if (_.isEmpty(search_term)) {
          SearchResults.refresh([])
          UrlStore.trigger('refresh')
        } else {
          SearchResults.current_page = 0;
          SearchResults.next_page( search_term )
        }

        Search.current_value = search_term
      }
    }
  })

  window.Search = new LiveSearch

})