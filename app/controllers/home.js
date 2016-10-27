import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),
  numberOfEmployees: 0,

  init () {
    this.set('apiKey', config.dashboardAppGoogleApiKey);

    Ember.run.schedule('afterRender', () => {
      const data = this.get('model');
      const dataArray = this.get('dataConverter').csvToArray(data);
      this.set('dataArray', dataArray);
      this.set('numberOfEmployees', this.getNumberOfEmployees(dataArray));
    });
  },

  getNumberOfEmployees (data) {
    let result = 0;
    data.forEach((country) => {
      if (typeof country[1] === 'number') {
        result += country[1];
      }
    });
    return result;
  }
});
