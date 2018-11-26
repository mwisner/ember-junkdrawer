import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with child elements', async function(assert) {

    // Template block usage:
    await render(hbs`
      {{#ui/ui-box id="test" as |b|}}

        {{#b.header id="test-header"}}
          Create New Organization
        {{/b.header}}
      
        {{#b.body paddingSize=0 id="test-body"}}
          example content
        {{/b.body}}
      
        {{#b.footer justifyContent='center' id="test-footer"}}
          example content
        {{/b.footer}}
      
      {{/ui/ui-box}}
    `);

    assert.dom("#test").hasClass('card');
    assert.dom('#test-header').exists();
    assert.dom('#test-body').exists();
    assert.dom('#test-footer').exists();
  });

  test('it accepts layout option and renders flexbox classes', async function(assert) {
    await render(hbs`
      {{#ui/ui-box direction="row" id="test-box" as |b|}}
        {{#b.body paddingSize=0 id="test-body"}}
            example content
         {{/b.body}}
       {{/ui/ui-box}}
    `);

    assert.dom('#test-box').hasClass('icon-box-row');
  });

});
