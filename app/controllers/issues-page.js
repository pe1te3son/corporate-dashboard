import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),
  number_of_issues: null,

  init () {
    console.log(config.dashboardAppGoogleApiKey);
    Ember.run.schedule('afterRender', () => {
      const issuesPerYear = this.get('model').issues;
      const formatedIssuesPerYear = this.get('dataConverter').csvToArray(issuesPerYear);
      this.set('number_of_issues', formatedIssuesPerYear);
    });
  }
});
