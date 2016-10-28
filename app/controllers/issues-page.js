import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  sortedModel: Ember.computed.sort('model', (a, b) => {
    if (moment(a.date_submited).isBefore(b.date_submited)) {
      return 1;
    } else if (moment(a.date_submited).isAfter(b.date_submited)) {
      return -1;
    }
    return 0;
  })
});
