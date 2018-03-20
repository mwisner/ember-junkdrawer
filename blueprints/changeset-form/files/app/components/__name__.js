import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';


export default FormComponent.extend({
  model: computed(function() {
    // Return your model here
    return false;
  }),

  onSubmitSuccess() {},
  onSubmitFailure() {}
});
