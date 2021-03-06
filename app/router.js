import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('home', {path: '/'});
  this.route('issues-page', {path: '/issues'});
  this.route('key-metrics');
});

export default Router;
