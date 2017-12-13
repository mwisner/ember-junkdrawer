import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import FormComponent from 'ember-junkdrawer/components/form/changeset-form';


export default FormComponent.extend({
  store: service(),
});
