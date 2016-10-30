import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const elId = this.$().attr('id');
    const dataArray = this.get('data');
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart () {
      const data = google.visualization.arrayToDataTable([
        ['head', 'value'],
        ['20/20/12', 253]
      ]);

      const options = {
        title: 'Country Populations',
        legend: { position: 'none' },
        colors: ['#e7711c'],
        histogram: { lastBucketPercentile: 5 },
        vAxis: { scaleType: 'mirrorLog' }
      };

      const chart = new google.visualization.Histogram(document.getElementById(elId));
      chart.draw(data, options);
    }
  }
});
