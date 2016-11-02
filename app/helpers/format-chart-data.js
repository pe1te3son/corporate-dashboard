import Ember from 'ember';

export function formatChartData (params, hash) {
  const data = params[0];

  let sortedData = data.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return -1;
    } else if (a.timestamp > b.timestamp) {
      return 1;
    }
    return 0;
  });

  let formatedChartData = [];
  sortedData.forEach((item) => {
    formatedChartData.push([
      new Date(item[hash.xdata]),
      item[hash.ydata]
    ]);
  });
  return formatedChartData;
}

export default Ember.Helper.helper(formatChartData);
