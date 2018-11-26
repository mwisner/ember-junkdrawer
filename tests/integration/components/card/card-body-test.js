import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders and yields correct components', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#card/card-body id="test" as |b|}}
        {{#b.title id="title"}}Title{{/b.title}}
        {{#b.subtitle id="subtitle"}}Subtitle{{/b.subtitle}}
        {{#b.text id="text"}}Card text{{/b.text}}
        <span id="yield-anything">Yield anything</span>
      {{/card/card-body}}
    `);
    assert.dom('#test').hasClass('card-body');
    assert.dom('.card-title').isVisible();
    assert.dom('.card-subtitle').isVisible();
    assert.dom('.card-text').isVisible();
    assert.dom("#yield-anything").isVisible();
  });

  test('it renders with flexbox layout options', async function(assert) {
    await render(hbs`{{#card/card-body flex=true align=center id="test" as |b|}}{{/card/card-body}}`);
    assert.dom('#test').hasClass('d-flex', 'justify-content-center');
  });
});
