var EditUrlView = Backbone.View.extend({
  tagName   : 'div',
  id        : 'edit_url_view',

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
      left      : parseInt(document.width/2)-400
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
    console.log(this.model.get('id'))
    this.model.set(this.serialize())
    this.model.save()
    $(this.el).remove()
    return false
  },

  close : function() {
    $(this.el).remove()
  }
});