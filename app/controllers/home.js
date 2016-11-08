import Ember from 'ember';
import config from '../config/environment';

/**
 * @name homeController
 * @desc Home page Controller
 * @requires dataConverter service
*/
export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  init () {
    this.set('apiKey', config.dashboardAppGoogleApiKey);
  }
});
