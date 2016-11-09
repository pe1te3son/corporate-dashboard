import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  dataConverter: Ember.inject.service('data-converter'),

  model () {
    return $.get('data/employees.csv').then(response => {
      return this.get('dataConverter').csvToArray(response);
    });
  },

  afterModel: function () {
    this.controllerFor('home').startPolling();
    Ember.run.later(() => {

    }, 2000);
  },

  deactivate: function () {
    this.controllerFor('home').stopPolling();
  }
});
