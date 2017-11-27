import Component from '@ember/component';

import layout from '../../../templates/table/table/table-filter';

export default Component.extend({
  layout,
  parentComponent: null,
  defaultRecordQuery: {},
  defaultRecordFilter: null, // Ohh yeah, this isn't confusing at all.
  recordQuery: {},
  preFilterAlter: null,

  hasFiltered: false,

  /**
   *
   */
  init() {
    this._super(...arguments);
    this.setDefaultFilters();
  },

  setDefaultFilters() {
    if (this.get('defaultRecordQuery')) {

      let query = Object.assign({}, this.get('defaultRecordQuery'));
      this.set('recordQuery', query);

      let filter = Object.assign({}, query);

      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(filter);
      }

      this.set('parentComponent.recordQuery', filter);
      this.set('defaultRecordFilter', filter);

    }
  },

  actions: {
    submit(query) {

      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(query);
      }

      this.get('parentComponent').set('recordQuery', query);

      if (JSON.stringify(query) !== JSON.stringify(this.get('defaultRecordFilter'))) {
        this.get('parentComponent').resetTable();
        this.set('hasFiltered', true);
      }
    },

    reset: function () {
      this.setDefaultFilters();
      this.get('parentComponent').resetTable();
      this.set('hasFiltered', false);
    },
  }

});
