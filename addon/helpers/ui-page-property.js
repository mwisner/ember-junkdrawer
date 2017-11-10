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
    set(this, 'uiGlobal.pageTitleRaw', value);
  } else if (property === 'description') {
    set(this, 'uiGlobal.pageDescriptionRaw', value);
  } else if (property === 'actions') {
    set(this, 'uiGlobal.pageActionsComponentRaw', value);
  }
}

/**
 *
 */
function clearPageProps() {
  set(this, 'uiGlobal.pageDescriptionRaw', null);
  set(this, 'uiGlobal.pageTitleRaw', null);
  set(this, 'uiGlobal.pageActionsComponentRaw', null);
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
