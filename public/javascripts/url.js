var url = {
  
  init : function() {
    $('a.edit_url').each(function() {
      $(this).bind("click", function() {
        url.edit( $(this).attr("rel") );
        console.log("foo")
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
        console.log(response);
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
          console.log(response); 
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