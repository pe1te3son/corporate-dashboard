import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement () {
    const elId = this.$().attr('id');
    const geoData = this.get('data');
    if (!geoData) {
      console.error('[geo-graph]: Missing data');
      return;
    }
    google.charts.load('current', {'packages': ['geochart'], mapsApiKey: this.get('apiKey')});
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap () {
      const data = google.visualization.arrayToDataTable(geoData);
      const options = {};
      const chart = new google.visualization.GeoChart(document.getElementById(elId));

      chart.draw(data, options);
    }
  }
});
