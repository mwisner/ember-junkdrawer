import Component from '@ember/component';
import {assert, warn} from '@ember/debug';
import {get} from '@ember/object';


export default Component.extend({
  layout,
  classNames: ['card-img-top'],
  attributeBindings: ['src', 'alt'],
  tagName: 'img',
  src: false,
  alt: false,
  init() {
    this._super(..arguments);
    assert('You musn\'t modify `tagName` to be anything other than `img`',
            get(this, 'tagName') === 'img');
    assert('You must provide a `src` attribute', get(this, 'src'));
    warn('You really should provide an `alt`-text attribute if you care about the future of this internet thing', get(this, 'src'))
  }
});
