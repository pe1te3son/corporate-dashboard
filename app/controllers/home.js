import Ember from 'ember';

export default Ember.Controller.extend({
  dataConverter: Ember.inject.service('data-converter'),

  init () {
    Ember.run.schedule('afterRender', () => {
      const data = this.get('model');
      const dataArray = this.get('dataConverter').csvToArray(data);
      this.set('dataArray', dataArray);
      this.set('numberOfEmployees', this.getNumberOfEmployees(dataArray));
    });
  },

});
