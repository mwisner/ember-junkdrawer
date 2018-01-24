import Component from '@ember/component';
import layout from '../../templates/ui/ui-box';
import {assert} from '@ember/debug';
import {get, computed} from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['card'],
  classNameBindings: ['_cardLayoutModifier'],
  direction: 'column',
  init() {
    this._super(...arguments);
    let validLayouts = ['row', 'row-reverse', 'column'];
    assert('Must provide valid layout param for ui/box', validLayouts.includes(get(this, 'direction')))
  },
  _cardLayoutModifier: computed('direction', function () {
    return `icon-box-${get(this, 'direction')}`;
  })
});
