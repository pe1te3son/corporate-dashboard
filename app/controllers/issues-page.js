import Ember from 'ember';

/**
 * @name issues-page Controller
 * @desc Issues page Controller
*/
export default Ember.Controller.extend({
  sortAscending: false,
  searchInput: '',

  init () {
    Ember.run.schedule('afterRender', () => {
      // Sort data by date initialy
      this.sortStoreBy('timestamp');
      componentHandler.upgradeAllRegistered();
    });
  },

  sortStoreBy (property) {
    // Sort data based on property
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
    // Display data based on user input text
    let filter = this.get('searchInput');

    return this.get('model').filter(function (item, index, enumerable) {
      return item.get('customer_name').toLowerCase().match(filter.toLowerCase()) || item.get('customer_surname').toLowerCase().match(filter.toLowerCase());
    });
  }.property('searchInput', 'model.@each'),

  actions: {
    sortByProperty (property) {
      // When table head clicked sort data based on property passed from click event
      this.sortStoreBy(property);
    }
  }
});
