import Model from 'ember-data/model';

export default Model.extend({
  created: DS.attr('string'),
  modified: DS.attr('string'),
  metadata: DS.attr()
});
