import Model from 'ember-data/model';
import attr from 'ember-data/attr';


export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  createdAt: attr('date'),
  summary: attr('string'),
});
