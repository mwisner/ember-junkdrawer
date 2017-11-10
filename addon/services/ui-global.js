import { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  pageTitleRaw: 'Capitol Zen',
  pageDescriptionRaw: null,
  pageActionsComponentRaw: null,

  pageTitle: computed('pageTitleRaw', function() {
    return this.get('pageTitleRaw');
  }),

  pageDescription: computed('pageDescriptionRaw', function() {
    return this.get('pageDescriptionRaw');
  }),

  pageActions: computed('pageActionsComponentRaw', function() {
    return this.get('pageActionsComponentRaw');
  })
});
