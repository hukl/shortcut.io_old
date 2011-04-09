$(document).ready( function() {
  key_bindings.init();
  live.init();
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

  show : function() {
    $("#search_results").show();
    $("#search_results tr").first().addClass("selected");
    $("#live_search").bind("keydown", function( event ) {
      if (event.which == 40) {
        next_item = $('tr.selected').nextAll('.selectable').first();
        
        if (0 < next_item.length) {
          $("tr.selected").removeClass("selected");
          next_item.addClass("selected");
        }
        
        return false;
      } else if (event.which == 38) {
        prev_item = $('tr.selected').prevAll('.selectable').first();

        if (0 < prev_item.length) {
          $("tr.selected").removeClass("selected");
          prev_item.addClass("selected");
        }
        return false;
      }
    });
  },

  hide : function() {
    $("#search_results").hide();
  }

}


var live = {
  last_value : '',

  init : function() {

    $('#live_search').bind('keyup', function() {
      current_value = $('#live_search').val();

      if ( current_value != live.last_value ) {

        $.ajax({
          url       : '/urls/live_search?query=' + current_value,
          type      : 'POST',
          dataType  : 'html',
          success   : function(e) {
            search_results.show();
          }
        });


        live.last_value = current_value;
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
