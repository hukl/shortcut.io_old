var UrlPartial = Backbone.View.extend({
  tagName     : 'div',
  className   : 'uri',

  events      : {
    "mouseenter"        : "show_meta",
    "mouseleave"        : "hide_meta",
    "click .edit_url"   : "display_edit_widget",
    "click .show_url"   : "display_show_widget",
    "click .delete_url" : "delete_url"
  },

  initialize : function() {
    this.source    = $("#url_template").html();
    this.template  = Handlebars.compile(this.source);

    _.bindAll(this, ['render']);
    this.model.bind('change', this.render);
    this.model.view = this;

  },

  show_meta : function() {
    $(".meta", this.el).addClass("active")
  },

  hide_meta : function() {
    $(".meta", this.el).removeClass("active")
  },

  display_edit_widget : function() {
    App.show_widget( new EditUrlView({model : this.model}) )
    return false;
  },

  display_show_widget : function() {
    App.show_widget( new ShowUrlView({model : this.model}) )
    return false;
  },

  delete_url : function() {
    var delete_url = confirm("Are you sure?");

    if (delete_url) {
      this.model.destroy({
        success : function(model, response) {
          model.view.remove();
        }
      });
    }

    return false;
  },

  render: function() {
    $(this.el).html(this.template(this.model.attributes));
    return this;
  },
});
