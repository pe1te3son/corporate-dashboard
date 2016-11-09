import Ember from 'ember';
import config from '../config/environment';
import $ from 'jquery';

/**
 * @name homeController
 * @desc Home page Controller
 * @requires dataConverter service
*/
export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  init () {
    this.set('apiKey', config.dashboardAppGoogleApiKey);
  },

  intervalDefault: 5000,

  schedulePollEvent (event, interval) {
    var eventInterval = interval || this.get('intervalDefault');
    return Ember.run.later(() => {
      event.apply(this);
      this.set('timer', this.schedulePollEvent(event));
    }, eventInterval);
  },

  startPolling (interval) {
    this.set('timer', this.schedulePollEvent(this.get('onPoll'), interval));
  },

  stopPolling () {
    Ember.run.cancel(this.get('timer'));
  },

  onPoll () {
    const _this = this;
    return $.get('data/employees.csv')
      .then((response) => {
        return _this.get('dataConverter').csvToArray(response);
      })
      .then(array => {
        // Simulate changed data
        _this.set('model', _this.updateValues(array));
      });
  },

  updateValues (dataArray) {
    for (var i = 1; i < dataArray.length; i++) {
      let randomNumber = Math.floor(Math.random() * (499 + 1)) + 1;
      dataArray[i][1] += randomNumber;
    }
    return dataArray;
  }

});
