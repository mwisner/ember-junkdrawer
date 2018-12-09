import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#bs-card id="test" as |c|}}
        {{#c.header id="title"}}Title{{/c.header}}
        {{#c.body as |bod|}}
          {{#bod.text id="text"}}My text{{/bod.text}}
        {{/c.body}}
      {{/bs-card}}
    `);
    assert.dom('#test').hasClass('card');
    assert.dom('#title').isVisible();
    assert.dom('#text').isVisible();
  });
});
