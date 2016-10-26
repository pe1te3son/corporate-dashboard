import Ember from 'ember';
import csvParse from 'npm:babyparse';

export default Ember.Service.extend({

  csvToArray (csvFile) {
    let formatedData = csvParse.parse(csvFile);
    let dataArray = [];

    // Put header first into array
    dataArray.push(formatedData.data[0]);

    // Parse second value of each array into number
    for (var i = 1; i < formatedData.data.length; i++) {
      if (formatedData.data[i].length === 2) {
        dataArray.push([formatedData.data[i][0], parseInt(formatedData.data[i][1])]);
      }
    }
    return dataArray;
  }
});
