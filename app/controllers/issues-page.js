import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  sortedModel: null,
  sortAscending: false,

  init () {
    Ember.run.schedule('afterRender', () => {
      this.sortStoreByDate();
    });
  },

  sortStoreByDate (option) {
    return this.store.findAll('issue').then(res => {
      if (this.get('sortAscending')) {
        return res.sortBy('timestamp');
      }
      return res.sortBy('timestamp').reverse();
    }).then(sortedResponse => {
      this.set('sortAscending', !this.get('sortAscending'));
      this.set('sortedModel', sortedResponse);
    });
  },
    }
  }
});
