import Component from '@ember/component';

export default Component.extend({
  tagName: 'h5',
  classNames: ['card-header'],
  classNameBindings: ['contentModifier'],
  contentModifier: false,
});
