import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | close-button', function(hooks) {
  setupRenderingTest(hooks);

  test('close button renders and handles clicks', async function(assert) {
    assert.expect(4);

    this.set('myAction', function() { assert.ok(true)});
    await render(hbs`{{close-button (action myAction)}}`);
    assert.dom().hasText('×');
    assert.dom('button').hasClass('close');
    assert.dom('button').hasAttribute('aria-label', 'Close');
    await click('.close');
  });
});
