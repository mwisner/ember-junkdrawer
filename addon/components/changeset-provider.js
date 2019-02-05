import DSModelProvider from './ds-model-provider';
import layout from '../templates/components/changeset-provider';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';


export default DSModelProvider.extend({
  layout,
  /**
   * @public
   */
  changeset: null,
  /**
   * @public
   */
  validator: null,
  /**
   * @public
   */
  model: null,
  /**
   * Server errors array
   * @public
   **/
  serverErrors: A(),

  /**
   * onValidationErrors - noop
   * @public
   */
  onValidationErrors() {},

  didReceiveAttrs() {
    this._super(...arguments);
    let changeset = this.get('changeset');

    if (!changeset) {
      if (this.get('validator')) {
        changeset = new Changeset(this.get('model'), lookupValidator(this.get('validator')), this.get('validator'))
      } else {
        changeset = new Changeset(this.get('model'))
      }
    }

    this.set('changeset', changeset);
  },


  submitTask: task(function*(changeset) {
    if (changeset.isInvalid) {
      this.onValidationErrors(changeset.errors, changeset)
    }
    return yield changeset
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.onServerError(data);
        this.handleErrors(data);
      });
  }),

  handleErrors(data) {
    if ('payload' in data) {
      data = data[ 'payload' ];
    }
    if ('errors' in data) {
      if (Array.isArray(data[ 'errors' ])) {
        data[ 'errors' ].forEach(item => {
          if (this.get('changeset')) {
            let { source: { pointer }, title = '', detail = '' } = item;
            let keys = pointer.split('/');
            let key = (keys[ 1 ] === 'attributes') ? keys.splice(2) : keys.splice(1);
            key = key.join('.');
            this.get('changeset').pushErrors(key, title, detail);
          } else {
            this.get('serverErrors').addObject(item.detail);
          }
        });
      }

      if ('non_field_errors' in data[ 'errors' ]) {
        data[ 'errors' ][ 'non_field_errors' ].forEach(item => {
          this.get('serverErrors').addObject(item.detail)
        });
      }
    }
  },
  actions: {
    submitAction(changeset) {
      this.get('submitTask').perform(changeset)
    },
    cancelAction() {
      this.get('changeset').rollback();
    }
  }
});
