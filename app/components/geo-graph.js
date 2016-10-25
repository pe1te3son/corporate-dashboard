import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const elId = this.$().attr('id');
    google.charts.load('upcoming', {'packages':['geochart']});
     google.charts.setOnLoadCallback(drawRegionsMap);

     function drawRegionsMap() {

       var data = google.visualization.arrayToDataTable([
         ['Country', 'Popularity'],
         ['Germany', 200],
         ['France', 300],
         ['Spain', 400],
         ['Poland', 500],
         ['Belgium', 700]
       ]);

       var options = {
         region: 150
       };

       var chart = new google.visualization.GeoChart(document.getElementById(elId));

       chart.draw(data, options);
     }
  }
});
