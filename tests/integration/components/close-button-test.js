import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | close-button', function(hooks) {
  setupRenderingTest(hooks);

  test('close button renders and handles clicks', async function(assert) {
    assert.expect(2);

    this.set('myAction', function(val) { assert.ok(true)});
    await render(hbs`{{close-button onClose=(action myAction)}}`);
    assert.equal(this.element.textContent.trim(), '×');

    assert.dom('button').hasClass('close');
    assert.dom('button').hasAttribute('aria-label', 'Close');

    await click('.close');
  });
});
