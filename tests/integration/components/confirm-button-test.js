import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | confirm-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.set('realMissileAlert', function() {assert.ok(true, 'submit callback triggered')});
    this.set('fakeMissileAlert', function() { assert.ok(true, 'cancel callback triggered')});

    // Template block usage:
    await render(hbs`
      {{#confirm-button
        type="danger"
        buttonText="Dangerous Action"
        modalTitle="Trigger Missile Alert?"
        onSubmit=(action realMissileAlert)
        onCancel=(action fakeMissileAlert)
        id="test-button"
      }}
        This is the text that goes into the body of the modal.
      
      {{/confirm-button}}
    `);

    assert.dom('#test-button').exists();
    await click('#test-button');
    assert.dom('.modal-dialog').isVisible();
    await click('.btn-secondary');
    assert.dom('.modal-dialog').isNotVisible();

    // try again
    await click('#test-button');
    assert.dom('.modal-dialog').isVisible();
    await click('.btn-primary');
    assert.dom('.modal-dialog').isNotVisible();
  });
});
