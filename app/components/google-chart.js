import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({

  didInsertElement () {
    const elId = this.$().attr('id');
    this.set('elId', elId);
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

      Ember.run.later(() => {
        _this.initializeUpdateSimulator();
      }, 2000);
    }
  },

  didRender () {
    const _this = this;
    $(window).resize(function () {
      if (this.isResizing) {
        clearTimeout(this.isResizing);
      }

      this.isResizing = setTimeout(function () {
        $(this).trigger('hasResized');
      }, 400);
    });

    $(window).on('hasResized', function () {
      _this.setChartWidth();
      _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));
    });
  },

  initializeUpdateSimulator () {
    const chartData = this.get('data');
    let latestTimestamp = new Date(chartData[chartData.length - 1][0]).getTime();
    const min = 1;
    const max = 1000;
    const _this = this;
    let sum = getsum();

    function getsum () {
      let sum = 0;
      _this.get('data').forEach((item) => {
        sum += item[1];
      });
      return sum;
    }

    function simulateUpdate () {
      let value = _this.get('chartType') === 'Bar' ? Math.floor(Math.random() * (50 - min + 1)) + min : Math.floor(Math.random() * (max - min + 1)) + min;
      _this.get('chartData').addRow([new Date(latestTimestamp + 86400000), value]);
      _this.get('chartData').removeRow(0);
      _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));

      latestTimestamp += 86400000;
      sum += value;

      _this.sendAction('action', {
        chartType: _this.get('chartType'),
        payload: sum
      });

      setTimeout(
        simulateUpdate,
        Math.floor(Math.random() * (5000 + 1)) + 3000
      );
    }
    simulateUpdate();
  },

  setChartWidth () {
    const elWidth = $(`#${this.get('elId')}`).width();
    this.get('chartOptions').width = elWidth - 15;
  }
});
