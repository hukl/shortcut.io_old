var ShowUrlView = Backbone.View.extend({

  tagName   : 'div',
  id        : 'show_url_view',
  className : 'widget',

  events  : {
    'click input[type="reset"]' : "close"
  },

  initialize : function() {
    this.source    = $("#show_url_template").html();
    this.template  = Handlebars.compile(this.source);

    _.bindAll(this, ['render']);
    this.model.view = this;
  },

  render : function() {
    $('body').append(
      $(this.el).html(this.template(this.model.attributes))
    );

    $(this.el).css({
      position  : "fixed",
      top       : "200px",
      left      : parseInt(document.width/2)-400
    })

    $(this.el).show();

    return this;
  },

  close : function() {
    $(this.el).remove()
  }

});
