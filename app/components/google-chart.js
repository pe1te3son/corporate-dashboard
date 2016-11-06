import Ember from 'ember';
import $ from 'jquery';

/**
 * @name google-chart Component
 * @desc Draws either line or bar chart using google charts
 * @param { array } data - array of data required by google charts
 * @param { string } title - chart title
 * @param { string } xAxisLegend
 * @param { string } yAxisLegend
 * @param { object } chartOptions
 * @param { string } chartType - Line or Bar
 * @return { Ember Action } action - Notify parent when data changes
 */
export default Ember.Component.extend({

  didInsertElement () {
    const elId = this.$().attr('id');
    this.set('elId', elId);
    const formatedChartData = this.get('data');
    const _this = this;

    this.setChartWidth();
    google.charts.setOnLoadCallback(draw);

    // Draw chart
    function draw () {
      // Set chart globaly within component to be reused
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
        // Simulate data update
        _this.initializeUpdateSimulator();
      }, 2000);
    }
  },

  didRender () {
    // If window resized redraw chart
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

  /**
   * @name initializeUpdateSimulator
   * @desc Simulates live data update. It creates object and adds it to the chart as a new row,
   * then removes first row and Notifies parent controller.
   * @return { object }
   */
  initializeUpdateSimulator () {
    const chartData = this.get('data');
    let latestTimestamp = new Date(chartData[chartData.length - 1][0]).getTime();
    const min = 1;
    const max = 1000;
    const _this = this;
    let sum = getsum();

    // Sum of values
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

      // Notify parent of data update
      // Send update object
      _this.sendAction('action', {
        chartType: _this.get('chartType'),
        payload: sum
      });

      // Repeat data update randomly
      setTimeout(
        simulateUpdate,
        Math.floor(Math.random() * (5000 + 1)) + 3000
      );
    }

    // Initiate simulation
    simulateUpdate();
  },

  // Set chart width to 100% width of component
  setChartWidth () {
    const elWidth = $(`#${this.get('elId')}`).width();
    this.get('chartOptions').width = elWidth - 15;
  }
});
