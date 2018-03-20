import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('string'),
  modified: DS.attr('string'),
  metadata: DS.attr()
});
