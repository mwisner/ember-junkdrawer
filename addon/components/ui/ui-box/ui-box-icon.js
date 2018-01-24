import Component from '@ember/component';
import {computed, get} from '@ember/object';
import {assert} from '@ember/debug';

export default Component.extend({
  classNames: ['ui-box-icon', 'd-flex', 'justify-content-center', 'align-items-center'],
  classNameBindings: ['widthClass', 'borderRadiusClass', 'textClass', 'bgClass', 'paddingClass'],
  attributeBindings: ['width'],
  init() {
    this._super(...arguments);
    let colSize = get(this, 'colSize');
    assert('`colSize` must be >= 1 and < 12', (colSize >= 1) && (colSize < 12));
  },
  /**
   * Background Color
   * @type {String}
   */
  bgType: 'primary',

  /**
   * Text color
   * @type {String}
   */
  textType: 'white',

  /**
   * Default Padding
   * @type {Number}
   */
  paddingSize: 3,

  /**
   * Column width
   * N / 12 Columns
   * (Note: this is actually fake!)
   * @type {Number}
   */
  colSize: 4,

  /**
   * The following are private
   */
  bgClass: computed('bgType', function () {
    return `bg-${get(this, 'bgType')}`;
  }),
  textClass: computed('textType', function() {
    return `text-${get(this, 'textType')}`;
  }),
  paddingClass: computed('paddingSize', function () {
    return `p-${get(this, 'paddingSize')}`;
  }),
  borderRadiusClass: computed('direction', function() {
    return `icon-box__${get(this, 'direction')}-border`
  }),
  widthClass: computed('colSize', function () {
    return `icon-box__width-${get(this, 'colSize')}`
  })
});
