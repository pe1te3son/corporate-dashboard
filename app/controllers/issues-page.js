import Ember from 'ember';
import $ from 'jquery';

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
      this.sortStoreBy('submited');
      componentHandler.upgradeAllRegistered();
    });
  },

  sortStoreBy (property) {
    // Sort data based on property
    // return this.store.findAll('issue').then(res => {
    //   if (this.get('sortAscending')) {
    //     return res.sortBy(property);
    //   }
    //   return res.sortBy(property).reverse();
    // }).then(sortedResponse => {
    //   this.set('sortAscending', !this.get('sortAscending'));
    //   this.set('model', sortedResponse);
    // });

    if (this.get('sortAscending')) {
      const modelSorted = this.get('model').sortBy(property);
      this.set('model', modelSorted);
    } else {
      const modelSorted = this.get('model').sortBy(property).reverse();
      this.set('model', modelSorted);
    }

    this.set('sortAscending', !this.get('sortAscending'));
  },

  filteredContent: function () {
    // Display data based on user input text
    let filter = this.get('searchInput');

    return this.get('model').filter(function (item, index, enumerable) {
      return item.customer_name.toLowerCase().match(filter.toLowerCase()) || item.employee_name.toLowerCase().match(filter.toLowerCase());
    });
  }.property('searchInput', 'model.@each'),

  actions: {
    sortByProperty (property) {
      // When table head clicked sort data based on property passed from click event
      this.sortStoreBy(property);
    },

    searching () {
      this.stopPolling();
    },

    notSearching () {
      this.startPolling();
    }
  },

  intervalDefault: 7000,

  schedulePollEvent (event, interval) {
    var eventInterval = interval || this.get('intervalDefault');
    return Ember.run.later(() => {
      event.apply(this);
      this.set('timer', this.schedulePollEvent(event));
    }, eventInterval);
  },

  startPolling (interval) {
    this.set('timer', this.schedulePollEvent(this.get('onPoll'), interval));
  },

  stopPolling () {
    Ember.run.cancel(this.get('timer'));
  },

  onPoll () {
    return $.get('data/issues.json')
      .then(response => {
        this.set('model', response);
        return;
      })
      .then(() => {
        this.sortStoreBy('timestamp');
      });
  }
});
