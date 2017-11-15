import { scheduleOnce } from '@ember/runloop';
import Helper from '@ember/component/helper';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 *
 * @param property
 * @param tokens
 */
function updatePageProperty(property, tokens) {
  let value = '';

  if (Array.isArray(tokens)) {
    value = tokens.join(' ');
  } else if (typeof tokens === 'string') {
    value = tokens;
  }

  if (property === 'title') {
    set(this, 'uiGlobal.pageTitle', value);
  } else if (property === 'description') {
    set(this, 'uiGlobal.pageDescription', value);
  }
}

/**
 *
 */
function clearPageProps() {
  set(this, 'uiGlobal.pageDescription', null);
  set(this, 'uiGlobal.pageTitle', null);
}

/**
 *
 */
export default Helper.extend({
  uiGlobal: service('ui-global'),

  compute(params, hash) {
    if (!Array.isArray(params)) {
      return null;
    }

    const property = hash.property;

    scheduleOnce('afterRender', this, updatePageProperty, property, params);

    return null;
  },

  destroy() {
    scheduleOnce('afterRender', this, clearPageProps);
  }
});
