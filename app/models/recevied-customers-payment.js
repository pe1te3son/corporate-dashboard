import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('number'),
  paying_customers: DS.attr('number')
});
