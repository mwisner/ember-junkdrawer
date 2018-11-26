import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui/ui-box/ui-box-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders header', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#ui/ui-box/ui-box-header id="header"}}
        template block text
      {{/ui/ui-box/ui-box-header}}
    `);

    assert.dom('h5#header').exists();
    assert.dom('#header').hasClass('card-header');
  });
});
