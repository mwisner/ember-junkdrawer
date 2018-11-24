import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs/-list-group/lg-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with options', async function(assert) {

    let types = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' ];
    let type = types[Math.floor(Math.random() * types.length)];

    this.set('myType', type);
    await render(hbs`{{bs/-list-group/lg-item type=myType text="hello world"}}`);

    assert.dom().hasText('hello world');
    assert.dom('.list-group-item').exists();
    assert.dom('.list-group-item').hasClass(`list-group-item-${type}`);
  });

  test('it renders block form', async function(assert) {
    await render(hbs`{{#bs/-list-group/lg-item}} All the text here {{/bs/-list-group/lg-item}}`);
    assert.dom('.list-group-item').hasText('All the text here');
  });

  test('it renders with disabled property', async function ( assert ) {
    await render(hbs`{{bs/-list-group/lg-item disabled=true text="hello world"}}`);
    assert.dom('.list-group-item').hasClass('disabled');
  });

  test('it renders with active property', async function (assert) {
    await render(hbs`{{bs/-list-group/lg-item active=true text="hello world"}}`);
    assert.dom('.list-group-item').hasClass('active')
  });

  test('it renders with different tags', async function(assert) {
    await render(hbs`{{bs/-list-group/lg-item tagName='div' text="hello world"}}`);
    assert.dom('div.list-group-item').exists();
    assert.dom('li.list-group-item').doesNotExist();
  })
});
