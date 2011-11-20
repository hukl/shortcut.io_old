var EditUrlView = Backbone.View.extend({
  tagName   : 'div',
  id        : 'edit_url_view',
  className : 'widget',

  events    : {
    "reset form"  : "close",
    "submit form" : "submit"
  },

  initialize : function() {
    this.source    = $("#edit_url_template").html();
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
      left      : parseInt($(window).width()/2)-400
    })

    $(this.el).show();

    return this;
  },

  serialize : function() {
    return {
      title       : this.$('input[name="url[title]"]').val(),
      description : this.$('textarea[name="url[description]"]').val(),
      uri         : this.$('input[name="url[uri]"]').val(),
      tags        : this.$('input[name="url[tags]"]').val()
    }
  },

  submit : function() {
    this.model.save(this.serialize(), {
      success : function(model, response) {
        model.view.close()
      },
      error   : function(model, response) {
        console.log("error: " + response)
      }
    })
    return false
  },

  close : function() {
    $(this.el).remove()
  }
});
