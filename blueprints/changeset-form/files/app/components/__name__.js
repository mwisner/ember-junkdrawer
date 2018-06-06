import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import { computed } from '@ember/object';

export default FormComponent.extend({
  model: computed(function() {
    // Return your model here
    return false;
  }),

  onSubmitSuccess() {},
  onSubmitFailure() {}
});
