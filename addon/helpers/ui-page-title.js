import { scheduleOnce } from '@ember/runloop';
import Helper from '@ember/component/helper';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

function updateTitle(tokens) {
  let title = '';
  if (Array.isArray(tokens)) {
    title = tokens.join(' ');
  } else if (typeof tokens === 'string') {
    title = tokens;
  }

  set(this, 'uiGlobal.pageTitleRaw', title);
}

export default Helper.extend({
  uiGlobal: service('ui-global'),

  compute(params) {
    scheduleOnce('afterRender', this, updateTitle, params);
    return null;
  },

  destroy() {
    let tokens = get(this, 'uiGlobal');
    scheduleOnce('afterRender', this, updateTitle, tokens);
  }
});
