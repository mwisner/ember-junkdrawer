import Component from '@ember/component';
import layout from '../../templates/components/card/card-image';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';


export default Component.extend({
  layout,
  tagName: 'img',
  src: null,
  position: 'top',
  classNameBindings: ['imagePosition'],
  attributeBindings: ['src'],
  didReceiveAttrs() {
    assert('must provide a valid `src` attribute', this.get('src'));
  },
  imagePosition: computed('position', function() {
    return `card-img-${this.get('position')}`;
  })
});
