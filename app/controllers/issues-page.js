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
  actions: {
    sortByDate (event) {
      if ($(event.target).hasClass('mdl-data-table__header--sorted-descending')) {
        $(event.target).removeClass('mdl-data-table__header--sorted-descending');
        $(event.target).addClass('mdl-data-table__header--sorted-ascending');
      } else {
        $(event.target).removeClass('mdl-data-table__header--sorted-ascending');
        $(event.target).addClass('mdl-data-table__header--sorted-descending');
      }
      this.sortStoreByDate();
    }
  }
});
