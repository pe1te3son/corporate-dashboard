import Ember from 'ember';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  numberOfPayingCustomers: function () {
    const customers = this.get('model').customers;
    return this.get('dataConverter').csvToArray(customers);
  }.property('model'),

  numberOfIssues: function () {
    const issues = this.get('model').issues;
    const issuesFormated = this.get('dataConverter').csvToArray(issues);
    return issuesFormated;
  }.property('model')
});
