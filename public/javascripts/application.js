$(document).ready( function() {

  live.init();
  links.init();

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
            links.init();
          }
        });


        live.last_value = current_value;
      }

    });
  }
}

var links = {
  init : function() {
    $('a.copy').bind('click', function(e) {
      url = $(this).prev().attr("href")

      $(this).prev().replaceWith(
        "<input type='text' class='copy_url' value='"+ url +"' />"
      );

      $(this).prev().select();

      $(this).prev().bind('blur', function() {
        $(this).replaceWith("<a href='"+url+"'>"+url+"</a>")
      });

      return false
    })


    $('div.post').bind('mouseenter', function() {
      $(this).animate({
        backgroundColor : "#e6e6e6"
      }, 300)
    })

    $('div.post').bind('mouseleave', function() {
      $(this).animate({
        backgroundColor : "#f1f1f1"
      }, 300)
    })
  }
}
