import Component from '@ember/component';

export default Component.extend({
  classNames: ['card-header'],
  classNameBindings: ['contentModifier'],
  contentModifier: false,
});
