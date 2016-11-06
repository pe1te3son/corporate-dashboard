import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  init () {
    this.set('apiKey', config.dashboardAppGoogleApiKey);
  },

  dataArray: function () {
    const model = this.get('model');
    return this.get('dataConverter').csvToArray(model);
  }.property('model'),

  numberOfEmployees: function () {
    const dataArray = this.get('dataArray');

    let result = 0;
    dataArray.forEach((country) => {
      if (typeof country[1] === 'number') {
        result += country[1];
      }
    });
    return result;
  }.property('dataArray')
});
