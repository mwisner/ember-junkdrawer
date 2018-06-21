import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['card-footer', 'd-flex', 'align-items-center'],
  classNameBindings: ['justifyContent'],
  contentAlign: 'right',

  justifyContent: computed('contentAlign', function() {
    switch(this.get('contentAlign')) {
      case 'right':
        return 'justify-content-end';
      case 'center':
        return 'justify-content-center';
      case 'left':
        return 'justify-content-start';
      case 'between':
        return 'justify-content-between';
    }
  }),
});
