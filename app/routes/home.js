import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function () {
    this.controllerFor('home').startPolling();
    Ember.run.later(() => {

    }, 2000);
  },

  deactivate: function () {
    this.controllerFor('home').stopPolling();
  }
});
