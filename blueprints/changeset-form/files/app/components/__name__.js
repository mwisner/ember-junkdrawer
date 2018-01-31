import { inject as service } from '@ember/service';
import { computed, set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';


export default FormComponent.extend({
  flashMessages: service(),
  model: computed(function() {
    // Return your model here
    return false;
  }),

  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  },
});
