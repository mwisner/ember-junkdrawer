import { computed, get, set, getProperties, setProperties } from '@ember/object';
import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({
  pageTitleRaw: '',
  pageDescriptionRaw: null,

  pageTitle: computed('pageTitleRaw', function() {
    return this.get('pageTitleRaw');
  }),

  pageDescription: computed('pageDescriptionRaw', function() {
    return this.get('pageDescriptionRaw');
  }),
});
