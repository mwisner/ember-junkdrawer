import Control from 'ember-bootstrap/components/bs-form/element/control';

import layout from '../../../../templates/bs-form/element/control/x-toggle';
import {computed, get} from '@ember/object';

export default Control.extend({
  layout,

  toggleOptions: computed('options', function() {
    let defaults = {
      showLabels: false,
      onLabel: '',
      offLabel: '',
      theme: 'default',
      size: 'medium',
    };
    return Object.assign(defaults, this.get('options'));
  }),

});
