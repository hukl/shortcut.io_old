var url = {

  init : function() {
    url.setup( $('div.uri') );
  },

  setup : function( elements ) {

    elements.each(function() {
      $(this).find("div.details input").bind("click", function() {
        $(this).select();
      });

      $(this).bind("mouseover", function() {
        $(this).children('div.meta').show();
      });

      $(this).bind("mouseout", function() {
        $(this).children('div.meta').hide();
      });

      $(this).find("a.edit_url").bind("click", function() {
        url.edit( $(this).attr("rel") );
        return false;
      })
    })
  },

  find : function( options ) {
    $.ajax({
      url       : '/urls/' + options.url_id,
      type      : 'GET',
      dataType  : 'json',
      success   : options.callback,
      error     : function(response) { console.log("error: " + response)}
    });
  },

  save : function( options ) {
    $.ajax({
      url       : '/urls/' + options.url_id,
      type      : 'PUT',
      data      : options.data,
      dataType  : 'json',
      success   : options.callback,
      error     : function(response) { console.log("error: " + response)}
    });
  },

  edit : function(url_id) {
    var source   = $("#edit_url_template").html();
    var template = Handlebars.compile(source);

    url.find({
      url_id    : url_id,
      callback  : function(response) {
        if (0 < (element = $('#edit_url_view')).length) {
          element.replaceWith(template(response));
        } else {
          $("body").append(template(response.url))
        }

        url.setup_edit_form();
      }
    })
  },

  setup_edit_form :function() {
    $("#edit_url_view").css({
      position  : "fixed",
      top       : "200px",
      left      : parseInt(document.width/2)-400
    });

    $("#edit_url_view form").bind('submit', function() {
      url.save({
        url_id    : $('#edit_url_view form input[type=hidden]').val(),
        data      : $('#edit_url_view form').serialize(),
        callback  : function(response) {
          $("#edit_url_view").remove();
        }
      });


      return false;
    });

    $("#edit_url_view form").bind('reset', function() {
      $('#edit_url_view').remove();
      return false;
    });
  }

}