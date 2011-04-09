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
      url       : '/urls/search?query=' + options.query,
      type      : 'POST',
      dataType  : options.dataType,
      success   : options.success
    });
  },
  
  update_matrix : function( results ) {
    $('#matrix').html(results);
  },
  
  get_results : function(element) {
    if (element.parent().attr('id') == 'filter') {
      var query = element.children('.search_category_result').html();
      search_results.query_server({
        query    : query,
        dataType : 'html',
        success  : search_results.update_matrix
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
      if (event.which != 40 && event.which != 38) {
        current_value = $('#live_search').val();
        if (current_value == "") {
          $("#filter td.search_category_result").html("all");
        } else {
          $("#filter td.search_category_result").html(current_value);
        }
        
        search_results.show();
        
        
        
        if ($('#search_results table tr.selected').length == 0) {
          $('#search_results table tr.selectable').first().addClass('selected');
        }
        
        // if ( current_value != live.last_value ) {
        // 
        //   $.ajax({
        //     url       : '/urls/live_search?query=' + current_value,
        //     type      : 'POST',
        //     dataType  : 'html',
        //     success   : function(e) {
        //       
        //     }
        //   });
        // 
        // 
        //   live.last_value = current_value;
        // }
        
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
