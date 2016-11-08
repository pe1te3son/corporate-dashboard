import Ember from 'ember';
import $ from 'jquery';

/**
 * @name Geo-graph Component
 * @desc Displays map with employess in different locations
 * @param { array } data - array of data required by google charts
*/
export default Ember.Component.extend({
  poller: Ember.inject.service('poller'),
  dataConverter: Ember.inject.service('data-converter'),
  chartData: null,

  init () {
    const _this = this;
    this._super();
    this.get('poller').onPoll = function () {
      return _this.drawChart();
    };
  },
  drawChart () {
    const _this = this;
    return $.get('data/employees.csv')
      .then(response => {
        return _this.get('dataConverter').csvToArray(response);
      })
      .then(respConverted => {
        _this.updateValues(respConverted);
        _this.set('chartData', respConverted);
      });
  },

  updateValues (array) {
    this.dataArray = array;
    for (var i = 1; i < this.dataArray.length; i++) {
      let randomNumber = Math.floor(Math.random() * (99 + 1)) + 1;
      this.dataArray[i][1] += randomNumber;
    }
    return this.dataArray;
  },

  chartDatahasChanged: function () {
    let data = google.visualization.arrayToDataTable(this.get('chartData'));
    this.get('chart').draw(data);
  }.observes('chartData'),

  didInsertElement () {
    const _this = this;
    const elId = this.$().attr('id');

    google.charts.load('current', {'packages': ['geochart'], mapsApiKey: this.get('apiKey')});
    google.charts.setOnLoadCallback(setChart);

    function setChart () {
      _this.set('chart', new google.visualization.GeoChart(document.getElementById(elId)));
      _this.drawChart();
    }

    this.get('poller').startPolling();
  },

  willDestroyElement () {
    this.get('poller').stopPolling();
  }
});
