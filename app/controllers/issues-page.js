import Ember from 'ember';

export default Ember.Controller.extend({
  sortedModel: Ember.computed.sort('model', (a, b) => {
    if (a.get('timestamp') < b.get('timestamp')) {
      return 1;
    } else if (a.get('timestamp') > b.get('timestamp')) {
      return -1;
    }
    // if a === b
    return 0;
  }),
});
