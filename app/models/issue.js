import DS from 'ember-data';

export default DS.Model.extend({
  customer_name: DS.attr('string'),
  customer_surname: DS.attr('string'),
  timestamp: DS.attr('number'),
  email: DS.attr('string'),
  issue_desc: DS.attr('string'),
  is_closed: DS.attr('boolean')
});
