import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {


    // Template block usage:
    await render(hbs`
      {{#card/card-header id="test"}}
        template block text
      {{/card/card-header}}
    `);

    assert.dom("#test").hasClass('card-header');
  });
});
