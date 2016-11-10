import Ember from 'ember';

/**
 * @name Geo-graph Component
 * @desc Displays map with employess in different locations.
*/
export default Ember.Component.extend({

  chartDatahasChanged: function () {
    let data = google.visualization.arrayToDataTable(this.get('data'));
    this.get('chart').draw(data);
  }.observes('data'),

  didInsertElement () {
    const _this = this;
    const elId = this.$().attr('id');

    google.charts.load('current', {'packages': ['geochart'], mapsApiKey: this.get('apiKey')});
    google.charts.setOnLoadCallback(setChart);

    function setChart () {
      _this.set('chart', new google.visualization.GeoChart(document.getElementById(elId)));
      let data = google.visualization.arrayToDataTable(_this.get('data'));
      _this.get('chart').draw(data);
    }
  }
});
