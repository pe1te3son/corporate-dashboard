import Ember from 'ember';

export default Ember.Controller.extend({
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
      componentHandler.upgradeAllRegistered();
    });
  }
});
