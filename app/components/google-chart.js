import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({

  didRender () {
    const elId = this.$().attr('id');
    const formatedChartData = this.get('data');
    const _this = this;

    this.setChartWidth();
    google.charts.setOnLoadCallback(draw);

    function draw () {
      _this.set('chartData', new google.visualization.DataTable());
      _this.get('chartData').addColumn('date', _this.get('xAxisLegend'));
      _this.get('chartData').addColumn('number', _this.get('yAxisLegend'));
      _this.get('chartData').addRows(formatedChartData);

      _this.set(
        'chart',
        new google.charts[_this.get('chartType')](document.getElementById(elId))
      );
      _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));

      let latestTimestamp = new Date(formatedChartData[formatedChartData.length - 1][0]).getTime();

      simulateUpdate();
      function simulateUpdate () {
        const min = 1;
        const max = 1000;
        _this.get('chartData').addRow([new Date(latestTimestamp + 86400000), Math.floor(Math.random() * (max - min + 1)) + min]);
        latestTimestamp += 86400000;
        _this.get('chartData').removeRow(0);
        _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));
        _this.notifyUpdate();

        setTimeout(
          simulateUpdate,
          Math.floor(Math.random() * (5000 + 1)) + 3000
        );
      }

      $(window).on('resize', () => {
        try {
          _this.setChartWidth();
          _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));
        } catch (err) {
          $(window).off('resize');
        }
      });
    }
  },

  setChartWidth () {
    const elWidth = this.$().width();
    this.get('chartOptions').width = elWidth - 15;
  }
});
