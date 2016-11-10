import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model () {
    return $.get('data/issues.json');
  },

  actions: {
    loading (transition) {
      let controller = this.controllerFor('application');
      controller.set('isLoading', true);

      transition.finally(() => {
        Ember.run.later(() => {
          controller.set('isLoading', false);
        }, 500);
      });
    }
  },

  afterModel: function () {
    this.controllerFor('issues-page').startPolling();
  },

  deactivate: function () {
    this.controllerFor('issues-page').stopPolling();
  }
});
