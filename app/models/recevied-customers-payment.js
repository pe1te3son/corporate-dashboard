import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('number'),
  customers: DS.attr('number')
});
