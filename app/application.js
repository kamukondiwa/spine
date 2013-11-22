$(function() {

  var AutoCompleteItem = Backbone.Model.extend({
    default: {
      title: ''
    }
  });

  var AutoCompleteItems = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: new AutoCompleteItem(),
    url: function() {
      return '/api/search/?q=' + this.title;
    },
    parse: function(response) {
      console.log(response);
    },
    fetch: function(options) {
      this.title = options.title;
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });

  var app = app || {};
  var ENTER_KEY = 13;

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({
    el: '#autocomplete-app',

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed.`
    initialize: function() {
      this.$search = this.$('#search');
    },

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'keypress #search': 'performSearch'
    },

    createdSearchModel: function() {
      return {
        title: this.$search.val().trim()
      };
    },

    performSearch: function(event) {
      if (this.$search.val().trim().length < 3) {
        return;
      }

      this.collection.fetch(this.createdSearchModel());
      console.log('search for ' + this.$search.val())
    },
  });

  // Kick things off by creating the **App**.
  new app.AppView({
    collection: new AutoCompleteItems()
  });

});