import LinkComponent from '@ember/routing/link-component';
import {get, computed} from '@ember/object'

LinkComponent.reopen({
  type: 'default',
  classNames: ['btn'],
  classNameBindings: ['linkType'],
  linkType: computed('type', function() {
    return `btn-${get(this, 'type')}`;
  })
});

export default LinkComponent;
