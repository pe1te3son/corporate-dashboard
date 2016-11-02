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
      const data = new google.visualization.DataTable();
      data.addColumn('date', _this.get('xAxisLegend'));
      data.addColumn('number', _this.get('yAxisLegend'));
      data.addRows(formatedChartData);

      const chart = new google.charts[_this.get('chartType')](document.getElementById(elId));
      chart.draw(data, _this.get('chartOptions'));

      let currentTimestamp = new Date(formatedChartData[formatedChartData.length - 1][0]).getTime();
      simulateUpdate();
      function simulateUpdate () {
        const min = 1;
        const max = 1000;
        data.addRow([new Date(currentTimestamp + 86400000), Math.floor(Math.random() * (max - min + 1)) + min]);
        currentTimestamp += 86400000;
        data.removeRow(0);
        chart.draw(data, _this.get('chartOptions'));
        setTimeout(simulateUpdate, 5000);
      }

      $(window).on('resize', () => {
        try {
          _this.setChartWidth();
          chart.draw(data, _this.get('chartOptions'));
        } catch (err) {
          $(window).off('resize');
        }
      });
    }
  },

  setChartWidth () {
    const elWidth = this.$().width();
    this.get('chartOptions').width = elWidth;
  }
});
