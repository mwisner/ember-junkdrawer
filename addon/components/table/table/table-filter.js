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

  /**
   *
   */
  setDefaultFilters() {
    if (this.get('defaultRecordQuery')) {

      let query = Object.assign({}, this.get('defaultRecordQuery'));
      this.set('recordQuery', query);

      let filter = Object.assign({}, query);

      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(filter);
      }

      //
      // Ensures that the initial load respects whatever filter options were passed.
      this.set('parentComponent.recordQuery', filter);

      //
      // Used to diff the default filter set with whatever the user has selected.
      this.set('defaultRecordFilter', filter);
    }
  },

  actions: {

    /**
     * Called when the user clicks the "filter" button.
     * @param query
     */
    submit(query) {

      //
      // Before every submit, if possible, we call the preFilterAlter hook
      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(query);
      }

      //
      // Using a string representation of the query object, determine if
      // anything as actually changed before
      // filtering the table.
      if (JSON.stringify(query) !== JSON.stringify(this.get('defaultRecordFilter'))) {
        this.get('parentComponent').set('recordQuery', query);
        this.get('parentComponent').resetTable();
        this.set('hasFiltered', true);
      }
    },

    /**
     *
     */
    reset() {
      this.setDefaultFilters();
      this.get('parentComponent').resetTable();
      this.set('hasFiltered', false);
    },
  }

});
