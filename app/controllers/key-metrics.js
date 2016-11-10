import Ember from 'ember';
import $ from 'jquery';

/**
 * @name key-metrics Controller
 * @desc Key-metrics page Controller
*/
export default Ember.Controller.extend({
  pollerService: Ember.inject.service('poller'),
  currentIssues: null,

  // Paying cutomers chart options
  lineChartOptions: {
    height: 350,
    legend: { position: 'none' },
    chart: {
      title: 'Paying customers per period'
    },
    hAxis: {
      format: 'yyyy/MM/dd'
    },
    bars: 'vertical'

  },

  // Number of issues chart options
  barChartOptions: {
    height: 250,
    legend: { position: 'none' },
    chart: {
      title: 'Number of Issues per period'
    },
    hAxis: {
      format: 'yyyy/MM/dd'
    },
    bars: 'vertical'
  },

  init () {
    // Load liberies to be used
    google.charts.load('current', {packages: ['corechart', 'bar', 'line']});
    Ember.run.schedule('afterRender', () => {
      // Register mdl lite listeners
      componentHandler.upgradeAllRegistered();
    });
  },

  // Customers
  lineChartData: function () {
    let sortedData = this.get('model').customers.sortBy('timestamp');
    let formatedChartData = [];
    sortedData.forEach((item) => {
      formatedChartData.push([
        new Date(item.timestamp),
        item.paying_customers
      ]);
    });
    return formatedChartData;
  }.property('model.customers.@each'),

  // Issues
  barChartData: function () {
    let sortedData = this.get('model').issues.sortBy('timestamp');
    let formatedChartData = [];
    sortedData.forEach((item) => {
      formatedChartData.push([
        new Date(item.timestamp),
        item.issues
      ]);
    });
    return formatedChartData;
  }.property('model.issues.@each'),

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
    $.get('data/number_of_paying_customers_per_year.json')
      .then(response => {
        // Update values
        return this.updateValues(response, 'paying_customers');
      })
      .then(resUpdated => {
        this.set('model.customers', resUpdated);
      });

    $.get('data/number_of_issues.json')
      .then(response => {
        // Update values
        return this.updateValues(response, 'issues');
      })
      .then(resUpdated => {
        this.set('model.issues', resUpdated);
      });
  },

  updateValues (array, property) {
    const arrayData = array;
    const min = 50;
    const max = 1000;
    arrayData.forEach((item) => {
      item[property] += Math.floor(Math.random() * (max - min + 1)) + min;
    });
    return arrayData;
  },

  issuesModelHasChanged: function () {
    let issuesSum = 0;
    this.get('model').issues.forEach((issue) => {
      issuesSum += issue.issues;
    });
    this.set('currentIssues', issuesSum);
  }.observes('model.issues')

});
