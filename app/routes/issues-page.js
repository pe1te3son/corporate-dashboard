import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model () {
    return $.get('data/issues.json').then((data) => {
      return data.slice(0, 10);
    });
  }
});
