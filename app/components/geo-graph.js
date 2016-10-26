import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement () {
    const elId = this.$().attr('id');
    const geoData = this.get('data');
    console.log(geoData);
    if (!geoData) { return; }
    google.charts.load('upcoming', {'packages': ['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap () {
      const data = google.visualization.arrayToDataTable(geoData);
      const options = {};
      const chart = new google.visualization.GeoChart(document.getElementById(elId));

      chart.draw(data, options);
    }
  }
});
