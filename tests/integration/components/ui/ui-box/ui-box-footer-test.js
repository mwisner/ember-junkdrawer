import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui/ui-box/ui-box-footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders footer', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#ui/ui-box/ui-box-footer justifyContent="start" id="footer"}}
        template block text
      {{/ui/ui-box/ui-box-footer}}
    `);
    assert.dom('#footer').hasClass('card-footer');
    assert.dom('#footer').hasClass('justify-content-start');
  });
});
