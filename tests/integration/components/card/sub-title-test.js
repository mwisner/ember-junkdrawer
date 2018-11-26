import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/sub-title', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#card/sub-title id="test"}}
        template block text
      {{/card/sub-title}}
    `);
    assert.dom('#test').hasClass('card-subtitle')
  });
});
