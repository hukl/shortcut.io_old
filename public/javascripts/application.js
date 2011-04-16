$(document).ready(function() {

  window.UrlStore = new Urls;

  window.UrlApp = Backbone.View.extend({
    el : $('#wrapper'),

    events : {
      'click #more' : 'fetch_more'
    },

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

      $('#matrix', this.el).append(items)
    },

    fetch_more : function() {
      console.log("oh")
      UrlStore.fetch()
      return false;
    },

  })

  window.App = new UrlApp;

});