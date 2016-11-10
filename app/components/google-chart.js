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
    const _this = this;

    this.setChartWidth();
    google.charts.setOnLoadCallback(function () {
      _this.drawChart(elId, _this.get('data'));
    });

    // // Draw chart
    // function draw () {
    //   // Set chart globaly within component to be reused
    //   _this.set('chartData', new google.visualization.DataTable());
    //   _this.get('chartData').addColumn('date', _this.get('xAxisLegend'));
    //   _this.get('chartData').addColumn('number', _this.get('yAxisLegend'));
    //   _this.get('chartData').addRows(_this.get('data'));
    //
    //   _this.set(
    //     'chart',
    //     new google.charts[_this.get('chartType')](document.getElementById(elId))
    //   );
    //   _this.get('chart').draw(_this.get('chartData'), _this.get('chartOptions'));
    // }
  },

  drawChart (elId, chartData) {
    this.set(
      'chart',
      new google.charts[this.get('chartType')](document.getElementById(elId))
    );
    const data = new google.visualization.DataTable();
    data.addColumn('date', this.get('xAxisLegend'));
    data.addColumn('number', this.get('yAxisLegend'));
    data.addRows(chartData);
    this.get('chart').draw(data, this.get('chartOptions'));
  },

  didRender () {
    // If window resized redraw chart
    const _this = this;
    const elId = this.$().attr('id');
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
      _this.drawChart(elId, _this.get('data'));
    });
  },

  didUpdateAttrs () {
    if (this.get('chart')) {
      Ember.run.schedule('afterRender', () => {
        this.drawChart(
          this.$().attr('id'),
          this.get('data')
        );
      });
    }
  },

  // Set chart width to 100% width of component
  setChartWidth () {
    const elWidth = $(`#${this.get('elId')}`).width();
    this.get('chartOptions').width = elWidth - 15;
  },

  didDestroyElement () {
    // Remove custom listeners
    $(window).off('resize');
    $(window).off('hasResized');
  }
});
