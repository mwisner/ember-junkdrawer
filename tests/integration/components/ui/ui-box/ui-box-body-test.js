import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui/ui-box/ui-box-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders body with opt', async function(assert) {


    // Template block usage:
    await render(hbs`
      {{#ui/ui-box/ui-box-body id="test" paddingSize=1}}
        template block text
      {{/ui/ui-box/ui-box-body}}
    `);

    assert.dom('#test').hasClass('card-body');
    assert.dom('#test').hasClass('p-1');
  });
});
