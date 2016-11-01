import Ember from 'ember';

export default Ember.Component.extend({
  chartData: null,

  click (e) {
    this.get('chartData').addRow([new Date(2015, 1, 5), 2]);
    this.get('ComponentChart').draw(this.get('chartData'), this.get('chartOptions'));
  },

  didInsertElement () {
    const elId = this.$().attr('id');

    if (this.get('title')) {
      this.get('chartOptions').title = this.get('title');
    }

    const formatedChartData = this.buildChartData(this.get('data'));

    this.set('formatedChartData', formatedChartData);

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.set('chartData', new google.visualization.DataTable());
      this.get('chartData').addColumn('date', this.get('xAxisLegend'));
      this.get('chartData').addColumn('number', this.get('yAxisLegend'));

      this.get('chartData').addRows(formatedChartData);

      this.drawChart(elId, this.get('chartData'), this.get('chartOptions'));
    });
  },

  chartOptions: {
    width: 1200,
    height: 500,
    hAxis: {
      format: 'yyyy/MM/dd',
      gridlines: {count: 13}
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
    let formatedData = [];
    for (var i = 1; i < data.length; i++) {
      formatedData.push([new Date(data[i].timestamp), data[i].paying_customers]);
    }
    return formatedData;
  }
});
