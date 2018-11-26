import Component from '@ember/component';
import layout from '../../templates/components/card/sub-title';

export default Component.extend({
  layout,
  tagName: 'h6',
  classNames: ['card-subtitle', 'text-muted']
});
