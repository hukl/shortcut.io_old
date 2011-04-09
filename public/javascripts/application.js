$(document).ready( function() {
  key_bindings.init();
  live.init();
  search_results.init();
  matrix.init();

});

var key_bindings = {
  init : function() {
    $(document).bind("keyup", function(e) {
      if (e.keyCode == 27 && $("#search_results").is(":visible") ) {
        $("#search_results").hide();
        $("#live_search").val("");
      }
    })
  }
}

var matrix = {

  init : function() {
    $("div.uri div.details input").bind("click", function() {
      $(this).select();
    });
  }

}

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
      $(document).unbind();
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
  },
  
  get_results : function(element) {
    var query_type = element.parent().attr('id');
    console.log(query_type)
    
    if (query_type == 'filter_search') {
      var query = element.children('.search_category_result').html();
      search_results.query_server({
        query       : query,
        query_type  : query_type,
        dataType    : 'html',
        success     : search_results.update_matrix
      });
    } else if (query_type == 'filter_tags') {
      var query = element.children('.search_category_result').html();
      search_results.query_server({
        query       : query,
        query_type  : query_type,
        dataType    : 'html',
        success     : search_results.update_matrix
      });
    }
  }

}


var live = {
  last_value : '',

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

  init : function() {

    $('#live_search').bind('keyup', function(event) {
      if (event.which != 40 && event.which != 38 && event.which != 13) {
        current_value = $('#live_search').val();
        if (current_value == "") {
          $("#filter_search td.search_category_result").html("all");
        } else {
          $("#filter_search td.search_category_result").html(current_value);
        }
        
        search_results.show();
        
        if ($('#search_results table tr.selected').length == 0) {
          $('#search_results table tr.selectable').first().addClass('selected');
        }
        
        live.compute_tags(current_value);
      }

    });

    $('.bookmark').bind('click', function() {
      $('.bookmark').each(function() {
        $(this).attr('class', 'bookmark');
      });
      $(this).attr('class', 'bookmark selected');
    });
  }
}
