import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model () {
    let allData = {};
    const customersPerYear = new Promise((resolve, reject) => {
      $.get('data/number_of_paying_customers_per_year.csv')
        .done((data) => {
          allData.customers = data;
          resolve();
        })
        .fail(() => {
          reject('Failded to fetch chart data');
        });
    });

    const issuesPerYear = new Promise((resolve, reject) => {
      $.get('data/number_of_issues_per_year.csv')
        .done((data) => {
          allData.issues = data;
          resolve();
        })
        .fail(() => {
          reject('Failded to fetch chart data');
        });
    });

    return Promise.all([customersPerYear, issuesPerYear]).then(() => {
      return allData;
    }).catch(() => {
      console.log('key metric route failed');
    });
  }
});
