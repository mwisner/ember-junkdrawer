import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-title', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders card title', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#card/card-title id="test"}}
        template block text
      {{/card/card-title}}
    `);
    assert.dom('#test').hasClass('card-title');
  });
});
