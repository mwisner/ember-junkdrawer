import Component from '@ember/component';
import {assert, warn} from '@ember/debug';
import {computed, get} from '@ember/object';


export default Component.extend({
  classNameBindings: ['_position'],
  attributeBindings: ['src', 'alt'],
  tagName: 'img',
  position: 'top',
  _position: computed('position', function() {
    return `card-img-${get(this, 'position')}`;
  }),
  src: false,
  alt: false,
  init() {
    this._super(...arguments);
    assert('You musn\'t modify `tagName` to be anything other than `img`',
            get(this, 'tagName') === 'img');
    assert('You must provide a `src` attribute', get(this, 'src'));
    assert('`position` must be either `top` or `bottom`', ['top', 'bottom'].includes(get(this, 'position')));
    warn('You really should provide an `alt`-text attribute if you care about the future of this internet thing', get(this, 'src'));
  }
});
