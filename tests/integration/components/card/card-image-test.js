import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card/card-image', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{card/card-image id="test" src="https://getbootstrap.com/docs/4.1/assets/img/bootstrap-stack.png"}}`);
    assert.dom('img#test').hasClass('card-img-top');
    await render(hbs`{{card/card-image position="bottom" id="test" src="https://getbootstrap.com/docs/4.1/assets/img/bootstrap-stack.png"}}`);
    assert.dom('img#test').hasClass('card-img-bottom');

  });
});
