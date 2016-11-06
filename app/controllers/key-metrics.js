import Ember from 'ember';

/**
 * @name key-metrics Controller
 * @desc Key-metrics page Controller
*/
export default Ember.Controller.extend({
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

  barChartData: function () {
    console.log(this.get('model').issues);
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

  actions: {
    chartHasUpdated (chartUpdateData) {
      if (chartUpdateData.chartType === 'Bar') {
        // Display updated number of issues on page
        this.set('currentIssues', chartUpdateData.payload);
      }
    }
  }

});
