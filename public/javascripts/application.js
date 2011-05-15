$(document).ready(function() {

  window.UrlStore = new Urls;

  window.UrlApp = Backbone.View.extend({
    el : $('#wrapper'),

    events : {
      'click #more' : 'fetch_more'
    },

    initialize : function() {
      _.bindAll(this, 'add_all', 'add_one', 'render');
      this.active_widget = null;
      UrlStore.bind('all', this.render);
      UrlStore.bind('add', this.add_one)
      UrlStore.bind('refresh', this.add_all);
      SearchResults.bind('refresh', this.add_all_results);
      SearchResults.bind('add', this.add_one);
      SearchResults.bind('remove', this.remove_one_result);
      UrlStore.refresh(window.InitialData)
    },

    add_one : function(url) {
      var view = new UrlPartial({model : url});
      $('#matrix', this.el).append(view.render().el);
    },

    add_all : function() {
      var items = [];

      UrlStore.each(function(e) {
        var view = new UrlPartial({model : e});
        items.push(view.render().el)
      });

      $('#matrix', this.el).html(items)
    },

    add_all_results : function() {
      var items = [];

      SearchResults.each(function(e) {
        var view = new UrlPartial({model : e});
        items.push(view.render().el)
      });

      $('#matrix', this.el).html(items)
    },

    remove_one_result : function( url ) {
      url.view.remove();
    },

    fetch_more : function() {
      if (0 < SearchResults.size()) {
        SearchResults.next_page($('#live_search').val())
      } else {
        UrlStore.next_page()
      }

      return false;
    },

    show_widget : function( widget ) {
      if (this.active_widget !== null) {
        this.active_widget.close()
      }

      this.active_widget = widget
      this.active_widget.render()
    }

  })

  window.App = new UrlApp;

});
