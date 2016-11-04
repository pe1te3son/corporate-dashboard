import Ember from 'ember';

export default Ember.Controller.extend({
  sortAscending: false,
  searchInput: '',

  init () {
    Ember.run.schedule('afterRender', () => {
      this.sortStoreBy('timestamp');
    });
  },

  sortStoreBy (property) {
    return this.store.findAll('issue').then(res => {
      if (this.get('sortAscending')) {
        return res.sortBy(property);
      }
      return res.sortBy(property).reverse();
    }).then(sortedResponse => {
      this.set('sortAscending', !this.get('sortAscending'));
      this.set('model', sortedResponse);
    });
  },

  filteredContent: function () {
    let filter = this.get('searchInput');

    return this.get('model').filter(function (item, index, enumerable) {
      return item.get('customer_name').toLowerCase().match(filter.toLowerCase()) || item.get('customer_surname').toLowerCase().match(filter.toLowerCase());
    });
  }.property('searchInput', 'model.@each'),

  actions: {
    sortByProperty (property) {
      this.sortStoreBy(property);
    }
  }
});
