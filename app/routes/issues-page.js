import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model () {
    return $.get('/data/homicides.csv');
  }
});
