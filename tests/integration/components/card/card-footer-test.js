import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {


    // Template block usage:
    await render(hbs`
      {{#card/card-footer id="test"}}
        template block text
      {{/card/card-footer}}
    `);
    assert.dom('#test').hasClass('card-footer')
  });
});
