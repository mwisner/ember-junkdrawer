import Component from '@ember/component';
import layout from '../templates/components/ds-model-provider';
import { task } from 'ember-concurrency';
import { assert } from '@ember/debug'
import { readOnly } from '@ember/object/computed';


export default Component.extend({
  layout,

  /**
   * Model for form
   * @type DS.Model instance
   * @public
   */
  model: null,

  /**
   * Handle Submit Success
   * @method
   * @public
   */
  onSubmitSuccess() {},

  isLoading: readOnly('submit.isRunning'),

  /**
   * Handle Server Errors
   * @method
   * @public
   */
  onServerError() {},

  didReceiveAttrs() {
    if (!this.get('model') || this.get('model').hasOwnProperty('save')) {
      assert('you must provide a valid `model` object with a `save` method', false);
    }
  },

  submitTask: task(function*(model) {
    return yield model
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.onServerError(data);
        throw data;
      });
  }),
  actions: {
    submit(model) {
      this.get('submitTask').perform(model);
    }
  }
});
