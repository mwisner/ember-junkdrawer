import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import {equal} from '@ember/object/computed';

import Control from 'ember-bootstrap/components/bs-form/element/control';

import { task } from 'ember-concurrency';
import File from 'ember-file-upload/file';

import layout from '../../../../templates/bs-form/element/control/avatar';

export default Control.extend({
  layout,
  classNames: ['avatar-edit-wrapper'],
  ajax: service(),
  uploaderName: 'fileUpload',
  accept: 'image/*',

  /**
   * Set the initial state of the form depending on if there is a current
   * value or not.
   */
  init() {
    this._super(...arguments);

    // Determine initial state
    if (this.get('value')) {
      this.set('value_file_url', this.get('value'));
      this.set('state', 'default');
    } else {
      this.set('state', 'upload');
    }
  },

  /**
   * There are basically a handful states to get through actually having the correct image.
   *
   * default: A avatar already exists and is shown to the user with an option to replace
   * upload: Show the uploader because we either don't have any avatar or we want to replace the existing one.
   * crop: we're cropping after an upload.
   * loading: a loading icon
   */
  state: 'default',

  cropModalOpen: equal('state', 'crop'),

  /**
   * Task to upload files
   *
   * file: An ember-file-upload / file object.
   * file_group: a shitty name that should be either 'original' or 'value'
   */
  upload: task(function*(file, file_group) {
    let type = file.get('type');
    let upload_params = yield this.get('ajax')
      .request('/file_manager/', { data: { type: type } })
      .then(response => {
        let upload_info = response.data;
        return upload_info;
      });

    if (!upload_params) {
      return false;
    }

    let upload_response = yield file.upload({
      url: upload_params.url,
      contentType: type,
      data: upload_params.fields
    });

    if (!upload_response) {
      return false;
    }

    if (file_group === 'original') {
      this.set('original_file_url', upload_response.headers.location);
      this.set('state', 'crop');
    } else if (file_group === 'value') {
      this.set('value_file_url', upload_response.headers.location);
      const self = this;
      next(function() {
        self.set('value', upload_response.headers.location);
      });

      this.set('state', 'default');
    }
  }).enqueue(),

  actions: {
    fileUpload(file) {
      this.set('state', 'loading');
      get(this, 'upload').perform(file, 'original');
    },
    cancelCropping() {
      if (this.get('value')) {
        this.set('value_file_url', this.get('value'));
        this.set('state', 'default');
      } else {
        this.set('state', 'upload');
      }
    },
    doneCropping() {
      let selector = '.cropper-wrapper  > .image-cropper > img';
      let container = this.$(selector).get(0);
      let cropper = container.cropper;
      cropper.getCroppedCanvas();
      cropper.getCroppedCanvas({
        width: 240,
        height: 240,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high'
      });
      cropper.getCroppedCanvas().toBlob(
        blob => {
          let canvasFile = File.fromBlob(blob, 'blob');
          get(this, 'upload').perform(canvasFile, 'value');
        },
        'image/jpeg',
        '0.9'
      );
    },
    replaceExisting() {
      this.set('state', 'upload');
    }
  }
});
