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

  didUpdateAttrs () {
    console.log('attr update');
    console.log(this.get('chartType'));
  },
  // Set chart width to 100% width of component
  setChartWidth () {
    const elWidth = $(`#${this.get('elId')}`).width();
    this.get('chartOptions').width = elWidth - 15;
  }
});
