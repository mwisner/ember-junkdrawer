// BEGIN-SNIPPET model-form-example.js
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import OrganizationValidations from '../validators/model-form-example';

export default FormComponent.extend({
  flashMessages: service(),

  validator: OrganizationValidations,
  model: computed(function() {
    return {
      'name': 'My Awesome Organization',
    };
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  },

});
// END-SNIPPET
