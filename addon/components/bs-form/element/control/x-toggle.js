import Control from 'ember-bootstrap/components/bs-form/element/control';
import {computed} from '@ember/object';

import layout from '../../../../templates/bs-form/element/control/x-toggle';

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
