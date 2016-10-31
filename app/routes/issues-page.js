import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('issue', {
      startAt: 10,
      endAt: 20
    });
  }
});
