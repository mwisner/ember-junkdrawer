import Component from '@ember/component';
import {computed, get} from '@ember/object';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import {assert} from '@ember/debug';
import {alias, equal} from '@ember/object/computed';

import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

/**
 * Base component to handle simple forms.
 *
 * Assumptions:
 * Is using bootstrap forms
 * Is using changeset and primary changeset is stored at changeset.
 * Child class defines the following methods:
 *   initModel() {},
 *   onSubmitSuccess() {},
 *   onServerError() {},
 *
 * changeset is at component.changeset
 * model is at component.model
 *
 */
export default Component.extend({
  flashMessages: service(),

  model: null,
  validator: null,

  changeset: null,

  /**
   * OVERRIDE THESE
   */

  // Deprecated
  initModel() {},

  onSubmitSuccess() {},

  onServerError() {},

  /**
   * Init
   */
  didReceiveAttrs() {
    this._super(...arguments);

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

    // Keep for legacy loading
    if (!this.get('changeset')) {
      this.initModel();
    }

    assert('You must implement a `changeset` property', get(this, 'changeset'));
    assert('You must provide a valid `model` property', get(this, 'model'));
  },

  /**
   * default: form is clean and hasn't been submitted
   * pending: form has been submitted and is waiting for a server response
   */
  formState: 'default',

  /**
   *
   */
  buttonState: alias('formState'),

  /**
   * Can be used to disable buttons to help prevent double click.
   */
  formSubmitButtonDisabled: equal('formState', 'pending'),

  /**
   * When a form is first submitted, disable the state and whatnot.
   * state should either be pending or default
   */
  setFormState(state) {
    this.set('formState', state);
  },

  /**
   * Handle server errors. We just jam them up in as flash messages
   * Can't figure out how to put them next to the actual fields.
   */
  handleServerFormErrors(data) {
    if ('payload' in data) {
      data = data['payload'];
    }

    if ('errors' in data) {
      if (Array.isArray(data['errors'])) {
        data['errors'].forEach(item => {
          this.get('flashMessages').danger(item['detail']);
        });
      }

      if ('non_field_errors' in data['errors']) {
        data['errors']['non_field_errors'].forEach(item => {
          this.get('flashMessages').danger(item);
        });
      }
    }
  },
  /**
   * Destroy model if it's sitting around un-saved by the time the compnent is torn down
   */
  willDestroyElement() {
    this._super(...arguments);
    if (get(this, 'model.isNew')) {
      this.get('model').deleteRecord();
    }
  },
  /**
   * We use concurrency to help prevent quick duplicate form submission.
   */
  submit: task(function* (changeset) {
    yield changeset
      .save()
      .then(data => {
        this.onSubmitSuccess(data);
      })
      .catch(data => {
        this.handleServerFormErrors(data);
        this.setFormState('default');
        this.onServerError(data);
      });
  }).drop(),

  actions: {
    /**
     * Primary submit handler. Calls the ember concurrency task.
     * @param changeset
     */
    submit(changeset) {
      // Only submit if something has actually changed.
      if (!changeset.get('isDirty')) {
        return false;
      }
      this.setFormState('pending');
      return this.get('submit').perform(changeset);
    }
  }
});
