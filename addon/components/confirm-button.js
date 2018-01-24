import Component from '@ember/component';
import layout from '../templates/components/confirm-button';
import {computed, get, set} from '@ember/object';


export default Component.extend({
  layout,
  modalIsOpen: false,
  classNames: ['btn'],
  classNameBindings: ['buttonType'],
  type: 'primary',
  modalSize: 'sm',
  closeButton: 'Cancel',
  submitButton: 'Confirm',
  buttonText: 'Confirm',
  backdropClose: true,
  backdrop: true,
  fade: true,
  renderInPlace: false,
  buttonType: computed('type', function () {
    return `btn-${get(this, 'type')}`
  }),
  modalTitle: 'Confirm Action',
  defaultModalText: 'Are you sure you want to go through with this?',
  click() {
    set(this, 'modalIsOpen', true);
  },
  _closeModal() {
    set(this, 'modalIsOpen', false);
  },
  /*noops*/
  onSubmit() {},
  onCancel() {},
  actions: {
    submit(){
      this._closeModal()
      this.onSubmit();
    },
    cancel() {
      this._closeModal()
      this.onCancel();
    }
  }
});
