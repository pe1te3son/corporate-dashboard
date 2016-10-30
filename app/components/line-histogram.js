import Ember from 'ember';

export default Ember.Component.extend({
  chartData: null,

  click (e) {
    this.get('chartData').addRow([new Date(2015, 1, 5), 2]);
    this.get('ComponentChart').draw(this.get('chartData'), this.get('chartOptions'));
  },

  didInsertElement () {
    console.log(this.get('data'));
    const elId = this.$().attr('id');

    if (this.get('title')) {
      this.get('chartOptions').title = this.get('title');
    }

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.set('chartData', new google.visualization.DataTable());
      this.get('chartData').addColumn('date', 'Time of Day');
      this.get('chartData').addColumn('number', 'Rating');

      this.get('chartData').addRows([
        [new Date(2015, 0, 1), 5], [new Date(2015, 0, 2), 7], [new Date(2015, 0, 3), 3],
        [new Date(2015, 0, 4), 1], [new Date(2015, 0, 5), 3], [new Date(2015, 0, 6), 4],
        [new Date(2015, 0, 7), 3], [new Date(2015, 0, 8), 4], [new Date(2015, 0, 9), 2],
        [new Date(2015, 0, 10), 5], [new Date(2015, 0, 11), 8], [new Date(2015, 0, 12), 6],
        [new Date(2015, 0, 13), 3], [new Date(2015, 0, 14), 3], [new Date(2015, 0, 15), 5],
        [new Date(2015, 0, 16), 7], [new Date(2015, 0, 17), 6], [new Date(2015, 0, 18), 6],
        [new Date(2015, 0, 19), 3], [new Date(2015, 0, 20), 1], [new Date(2015, 0, 21), 2],
        [new Date(2015, 0, 22), 4], [new Date(2015, 0, 23), 6], [new Date(2015, 0, 24), 5],
        [new Date(2015, 0, 25), 9], [new Date(2015, 0, 26), 4], [new Date(2015, 0, 27), 9],
        [new Date(2015, 0, 28), 8], [new Date(2015, 0, 29), 6], [new Date(2015, 0, 30), 4],
        [new Date(2015, 0, 31), 6], [new Date(2015, 1, 1), 7], [new Date(2015, 1, 2), 9]
      ]);

      this.drawChart(elId, this.get('chartData'), this.get('chartOptions'));
    });
  },

  chartOptions: {
    width: 1200,
    height: 500,
    hAxis: {
      format: 'yyyy/MM/dd',
      gridlines: {count: 15}
    },
    vAxis: {
      gridlines: {color: 'none'},
      minValue: 0
    }
  },

  drawChart (containerId, dataTable, options) {
    const element = document.getElementById(containerId);
    this.set('ComponentChart', new google.visualization.LineChart(element));
    this.get('ComponentChart').draw(dataTable, options);
  },

  buildChartData (data) {

  }
});
