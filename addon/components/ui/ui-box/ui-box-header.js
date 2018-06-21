import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'h5',
  classNames: ['card-header', 'd-flex', 'align-items-center', 'px-3'],
  classNameBindings: ['justifyContent', 'paddingClass'],
  contentAlign: 'left',
  paddingSize: 3,

  justifyContent: computed('contentAlign', function() {
    switch(this.get('contentAlign')) {
      case 'left':
        return 'justify-content-start';
      case 'center':
        return 'justify-content-center';
      case 'right':
        return 'justify-content-end';
      case 'between':
        return 'justify-content-between';
    }
  }),

  paddingClass: computed('paddingSize', function() {
    return `py-${this.get('paddingSize')}`;
  }),
  });
