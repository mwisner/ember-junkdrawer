import Component from '@ember/component';

import layout from '../../../templates/table/table/table-filter';

export default Component.extend({
  layout,
  parentComponent: null,
  defaultRecordQuery: {},
  recordQuery: {},
  preFilterAlter: null,

  /**
   *
   */
  init() {
    this._super(...arguments);

    //
    // Ensure the initial dataset respects
    if (this.get('defaultRecordQuery')) {
      let query = this.get('defaultRecordQuery');

      this.set('recordQuery', query);
      let filter = Object.assign({}, query)

      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(filter);
      }

      this.set('parentComponent.recordQuery', filter);
    }

  },

  actions: {
    submit: function(query) {

      if (this.get('preFilterAlter')) {
        query = this.get('preFilterAlter')(query);
      }

      this.get('parentComponent').set('recordQuery', query);
      this.get('parentComponent').resetTable();
    }
  }

});
