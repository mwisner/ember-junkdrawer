import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs/-list-group/lg-action', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders text and handles actions', async function(assert) {
    assert.expect(4);

    this.set('myAction', function () { assert.ok(true) });
    let text = "Hello from the other side. I must've called a thousand times";
    this.set('myText', text);
    await render(hbs`{{bs/-list-group/lg-action text=myText onClick=(action myAction)}}`);
    assert.dom('.list-group-item-action').exists();
    assert.dom('.list-group-item-action').hasText(text);
    await click('button');
    // Template block usage:
    await render(hbs`
      {{#bs/-list-group/lg-action}}
        template block text
      {{/bs/-list-group/lg-action}}
    `);
    assert.dom('button').hasText('template block text');
  });
});
