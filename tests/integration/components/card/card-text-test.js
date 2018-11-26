import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders card-body contextual component', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#card/card-text id="test"}}
        template block text
      {{/card/card-text}}
    `);
    assert.dom('p#test').exists();
    assert.dom('p#test').hasClass('card-text')
  });
});
