import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('issue').then(res => {
      return res;
    });
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
  }
});
