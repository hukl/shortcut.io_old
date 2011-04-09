$(document).ready( function() {

  live.init();
  links.init();
	matrix.init();

});             

var matrix = {
	
	init : function() {
		$("div.uri div.details input").bind("click", function() {
			$(this).select();
		});
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
            $('#bookmarks').html(e);
            links.init();
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

    $('body').bind('keydown', function(e) {
      if (e.which == 40) {
        next_item = $('.bookmark.selected').next();

        if (0 < next_item.length) {
          $('.bookmark').each(function() {
            $(this).attr('class', 'bookmark');
          });

          next_item.attr('class', 'bookmark selected')

          $('body').scrollTop( next_item.position().top-60);
        }

        return false;
      } else if (e.which == 38) {
        prev_item = $('.bookmark.selected').prev();

        if (0 < prev_item.length) {
          $('.bookmark').each(function() {
            $(this).attr('class', 'bookmark');
          });

          prev_item.attr('class', 'bookmark selected')
          $('body').scrollTop(prev_item.position().top-60);
        }

        return false;
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
