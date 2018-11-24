import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs/-list-group/lg-link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a link', async function(assert) {

    await render(hbs`{{bs/-list-group/lg-link 'inline text'}}`);

    assert.dom('a').hasText('inline text');
    assert.dom('a').hasAttribute('href');
  });
});
