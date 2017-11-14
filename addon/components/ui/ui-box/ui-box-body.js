import Component from '@ember/component';

export default Component.extend({
  classNames: ['card-body'],
  classNameBindings: ['contentModifier'],
  contentModifier: false,
});
