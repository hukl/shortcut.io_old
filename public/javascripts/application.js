Handlebars.registerHelper('truncate', function(title) {
  return title.substring(0, 30);
});

Handlebars.registerHelper('thumbnail_url_200', function(image_uuid) {
  var segments = [
    "http://background.shortcut.io",
    image_uuid.substring(0,4),
    image_uuid.substring(4,8),
    (image_uuid + "_200.jpg")
  ];

  return segments.join("/");
});

Handlebars.registerHelper('thumbnail_url_300', function(image_uuid) {
  var segments = [
    "http://background.shortcut.io",
    image_uuid.substring(0,4),
    image_uuid.substring(4,8),
    (image_uuid + "_300.jpg")
  ];

  return segments.join("/");
});

$(document).ready(function() {

  window.Url = Backbone.Model.extend({

  });

  window.Urls = Backbone.Collection.extend({

    url : '/urls',
    model : Url

  });

  window.UrlStore = new Urls;

  window.UrlPartial = Backbone.View.extend({
    tagName     : 'div',
    className   : 'uri',

    events      : {
      "mouseover"         : "show_meta",
      "mouseout"          : "hide_meta",
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
      $(this.el).find(".meta").show()
    },

    hide_meta : function() {
      $(this.el).find(".meta").hide()
    },

    display_edit_widget : function() {
      var view = new EditUrlView({model : this.model});
      view.render();
      return false;
    },

    display_show_widget : function() {
      return false;
    },

    delete_url : function() {
      var delete_url = confirm("Are you sure?");

      this.model.destroy({
        success : function(model, response) {
          model.view.remove();
          UrlStore.fetch();
        }
      });

      return false;
    },

    render: function() {
      $(this.el).html(this.template(this.model.attributes));
      return this;
    },
  });

  window.EditUrlView = Backbone.View.extend({
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

  window.UrlApp = Backbone.View.extend({
    el : $('#matrix'),

    initialize : function() {
      _.bindAll(this, 'add_all', 'add_one', 'render');
      UrlStore.bind('all', this.render);
      UrlStore.bind('refresh', this.add_all);
      UrlStore.fetch();
    },

    add_one : function(url) {
      var view = new UrlPartial({model : url});
      this.el.append(view.render().el);
    },

    add_all : function() {
      var items = [];

      UrlStore.each(function(e) {
        var view = new UrlPartial({model : e});
        items.push(view.render().el)
      });

      this.el.html(items)
    }

  })

  var App = new UrlApp;

});