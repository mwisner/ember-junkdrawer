import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/ui/no-things';

import SlotsMixin from 'ember-block-slots';
import { pluralize, singularize } from 'ember-inflector';

export default Component.extend(SlotsMixin, {
  layout,
  classNames: ['thing-list-item', 'no-things-item', 'clearfix'],

  title: computed('thingName', function() {
    let thingName = this.get('thingName');

    if (!thingName) {
      return 'No Results Found';
    }

    thingName = pluralize(thingName);
    thingName = thingName.capitalize();

    return `No ${thingName} Found`;
  }),

  defaultActionName: computed('actionName', function() {
    let action = this.get('actionName');
    return action ? action.capitalize() : 'Add';
  }),

  message: computed('thingName', function() {
    let thing = this.get('thingName');
    if (!thing) {
      return false;
    }

    thing = singularize(thing);

    return `${this.get('defaultActionName')} a new ${thing} to get started.`;
  })
});
