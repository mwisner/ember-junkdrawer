import Component from '@ember/component';
import {task} from 'ember-concurrency';
import { get } from '@ember/object';
import {assert} from '@ember/debug';
import {alias} from '@ember/object/computed';
import {A} from '@ember/array';

import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend({
  model: null,
  validator: null,
  serverErrors: null,

  changeset: null,
  didReceiveAttrs() {
    this._super(...arguments);
    this.initFormData();
    assert('You must implement a `changeset` property', get(this, 'changeset'));
    assert('You must provide a valid `model` property', get(this, 'model'));
    this.set('serverErrors', A());
  },

  // noop hanlder
  onSubmitSuccess() {},
  onServerError() {},

  // Alaises
  didError: alias('submit.isError'),
  isLoading: alias('submit.isRunning'),
  

  /**
   * Init Models
   */
  initFormData() {

    //
    // Build Changeset
    if (this.get('model')) {
      let changeset = null;
      if (this.get('validator')) {
        changeset = new Changeset(
          this.get('model'),
          lookupValidator(this.get('validator')),
          this.get('validator')
        );
      } else {
        changeset = new Changeset(
          this.get('model'),
        );
      }
      this.set('changeset', changeset);
    }

    // Deprecated
    if (!this.get('changeset')) {
      this.initModel();
    }
  },
  handleServerFormErrors(data) {
    if ('payload' in data) {
      data = data['payload'];
    }

    if ('errors' in data) {
      if (Array.isArray(data['errors'])) {
        data['errors'].forEach(item => {
          

          if (this.get('changeset')) {
            let {source: {pointer}, title = '', detail = ''} = item;
            let keys = pointer.split('/');
            let key = (keys[1] === 'attributes') ? keys.splice(2) : keys.splice(1);
            key = key.join('.');
            this.get('changeset').pushErrors(key, title, detail);
          } else {
            this.get('serverErrors').addObject(item.detail);
          }
        });
      }

      if ('non_field_errors' in data['errors']) {
        data['errors']['non_field_errors'].forEach(item => {
          this.get('serverErrors').addObject(item.detail)
        });
      }
    }
  },
  /**
   * @private
   * We use concurrency to help prevent quick duplicate form submission.
   */
  submit: task(function* (changeset) {
    this.set('serverErrors', A());
    return yield changeset
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.onServerError(data);
        throw data;
      });
  }).drop(),

  /**
   * Destroy model if it's sitting around un-saved by the time the component is torn down
   */
  willDestroyElement() {
    this._super(...arguments);
    if (get(this, 'model.isNew')) {
      this.get('model').deleteRecord();
    }
  },

  /**
   * Reset the form with a fresh model data.
   * @public
   * @param {Object} freshModel A new object to re-initialize the form
   */
  resetFormData(freshModel) {
    this.set('model', freshModel);
    this.initFormData();
  },

  actions: {
    submit(changeset) {
      return this.get('submit').perform(changeset);
    },
    resetFormData(newModel) {
      this.resetFormData(newModel)
    }
  }
});
