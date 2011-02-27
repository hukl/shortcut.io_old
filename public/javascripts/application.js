$(document).ready( function() {

  live.init();

});


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
            $('#bookmarks').html(e);
          }
        });


        live.last_value = current_value;
      }

    });
  }
}
