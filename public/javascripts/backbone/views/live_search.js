$(document).ready(function() {

  window.SearchResults = new Results;

  window.LiveSearch = Backbone.View.extend({
    el : $('#live_search'),

    events : {
      'keyup' : 'handle_input'
    },

    initialize : function() {
      this.search_results = $('#search_results')

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
          this.get_results( $('#search_results table tr.selected') );
          break;
        case 27:
          break;
        case 38:
          this.select_prev();
          break;
        case 40:
          this.select_next();
          break;
        default:
          this.show_results();
          break;
      }
    },

    show_results : function() {

      var current_value = $('#live_search').val();

      if (current_value == "") {
        $("#filter_search td.search_category_result").html("all");
      } else {
        $("#filter_search td.search_category_result").html(current_value);
      }

      this.search_results.show();

      if ($('#search_results table tr.selected').length == 0) {
        $('#search_results table tr.selectable').first().addClass('selected');
      }

      this.compute_tags(current_value);
    },

    select_next : function() {
      next_item_in_group = $('tr.selected').nextAll('.selectable').first();
      next_item_in_next_group = $('tr.selected').parent().next().children('.selectable').first();

      if (0 < next_item_in_group.length) {
        $("tr.selected").each(function() {$(this).removeClass("selected")});
        next_item_in_group.addClass("selected");
      } else if (0 < next_item_in_next_group.length) {
        $("tr.selected").each(function() {$(this).removeClass("selected")});
        next_item_in_next_group.addClass("selected");
      }
    },

    select_prev : function() {
      prev_item_in_group = $('tr.selected').prevAll('.selectable').first();
      prev_item_in_next_group = $('tr.selected').parent().prev().children('.selectable').last();

      if (0 < prev_item_in_group.length) {
        $("tr.selected").each(function() {$(this).removeClass("selected")});
        prev_item_in_group.addClass("selected");
      } else if (0 < prev_item_in_next_group.length) {
        $("tr.selected").each(function() {$(this).removeClass("selected")});
        prev_item_in_next_group.addClass("selected");
      }
    },

    compute_tags : function( current_input ) {
      var container = $('#filter_tags')
      var tags      = current_input.split(",");
      var source    = $("#search_result_items").html();
      var template  = Handlebars.compile(source);

      if ( 1 < tags.length ) { tags.unshift(current_input) };

      result = [];

      for (var i=0; i<tags.length; i++) {
        if (i == 0) {
          var context = {title: "Tags", result: tags[i]};
        } else {
          var context = {title: "", result: tags[i]};
        }
        var html = template(context);
        result.push(html);
      }

      $('#filter_tags').html(result.join());
    },

    get_results : function(element) {
      var query_type  = element.parent().attr('id'),
          query       = element.children('.search_category_result').text();

      if (query === "all") {
        console.log("no")

        SearchResults.refresh([])
        UrlStore.trigger('refresh')
      } else {
        SearchResults.get_results_for({
          query       : query,
          query_type  : query_type,
          success     : this.update_results
        });
      }
    },

    update_results : function(response) {
      for (var i=0; i<response.length; i++) {
        SearchResults.add(response[i])
      }

      SearchResults.trigger('refresh')
    }

  })

  new LiveSearch

})


/*


var search_results = {
  init : function() {

    $("#live_search").bind("keydown", function( event ) {
      if (event.which == 40) {
        search_results.select_next();
        return false;
      } else if (event.which == 38) {
        search_results.select_prev();
        return false;
      }
    });

    $(document).bind('click', function() {
      if ( $('#search_results').is(':visible') ) {
        search_results.hide();
      }
    })
  },




  show : function() {
    var elem = $("#search_results");
    if (elem.is(":hidden")) {
      $("#search_results").show();
      $(document).bind("keyup", function(event) {
        if (event.which == 13) {
          search_results.get_results( $('#search_results table tr.selected') );
          search_results.hide();
          return false;
        }
      });
    }
  },

  hide : function() {
    var elem = $("#search_results");
    if (elem.is(":visible")) {
      $("#search_results").hide();
      $(document).unbind('keyup');
    }
  },

  query_server : function( options ) {
    $.ajax({
      url       : '/urls/search?query=' + options.query + '&query_type=' + options.query_type,
      type      : 'POST',
      dataType  : options.dataType,
      success   : options.success
    });
  },

  update_matrix : function( results ) {
    $('#matrix').html(results);
    matrix.init();
  },


}

*/
