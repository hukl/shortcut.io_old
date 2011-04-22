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
      UrlStore.bind('add', this.add_one)
      UrlStore.bind('refresh', this.add_all);
      SearchResults.bind('refresh', this.add_all_results);
      SearchResults.bind('add', this.add_one);
      SearchResults.bind('remove', this.remove_one_result);
      UrlStore.fetch();
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
    }

  })

  window.App = new UrlApp;

});