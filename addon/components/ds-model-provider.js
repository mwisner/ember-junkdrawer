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
   * @public
   */
  onSubmitSuccess() {},

  isLoading: readOnly('submitTask.isRunning'),

  /**
   * Handle Server Errors
   * @public
   */
  onServerError() {},

  /**
   * Handle errors internally
   * @private
   */
  handleErrors() {},
  didReceiveAttrs() {
    if (!this.get('model') || !this.get('model').hasOwnProperty('save')) {
      assert('you must provide a valid `model` object with a `save` method', false);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('model.isNew')) {
      this.get('model').deleteRecord();
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
        this.handleErrors(data);
      });
  }),
  actions: {
    submitAction(model) {
      this.get('submitTask').perform(model);
    }
  }
});
