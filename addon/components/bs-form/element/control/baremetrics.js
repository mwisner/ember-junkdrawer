import Control from 'ember-bootstrap/components/bs-form/element/control';

import layout from '../../../../templates/bs-form/element/control/baremetrics';

export default Control.extend({
  layout,

  /**
   *
   */
  init() {
    this._super(...arguments);
  },

  actions: {
    updateValue(data) {
      this.set('value', data);
    },
  }

});
