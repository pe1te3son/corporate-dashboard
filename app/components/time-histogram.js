import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const elId = this.$().attr('id');
    const dataArray = this.get('data');
    google.charts.load("current", {packages: ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
      var data = google.visualization.arrayToDataTable(dataArray);

      var options = {
        title: 'Lengths of dinosaurs, in meters',
        legend: {position: 'none'},
      };

      var chart = new google.visualization.Histogram(document.getElementById(elId));
      chart.draw(data, options);
    }
  }
});
