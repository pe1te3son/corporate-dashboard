import DS from 'ember-data';

export default DS.Model.extend({
  customer_name: DS.attr('string'),
  customer_surname: DS.attr('string'),
  date_submited: DS.attr('string'),
  email: DS.attr('string'),
  issue_desc: DS.attr('string')
});
