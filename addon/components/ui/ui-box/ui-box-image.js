import Component from '@ember/component';

export default Component.extend({
  classNames: ['card-thumbnail'],
  classNameBindings: ['contentModifier'],
  contentModifier: false,
});
