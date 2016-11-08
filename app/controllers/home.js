import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  init () {
    this.set('apiKey', config.dashboardAppGoogleApiKey);

    Ember.run.schedule('afterRender', () => {
      const data = this.get('model');
      const dataArray = this.get('dataConverter').csvToArray(data);
      this.set('dataArray', dataArray);
    });
  }
});
