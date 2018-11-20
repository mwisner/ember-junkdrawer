import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const ITEMS = [
  'I DO NOT LIKE THEM IN A BOX',
  'I DO NOT LIKE THEM WITH A FOX',
  'I DO NOT LIKE THEM IN A HOUSE.',
  'I DO NOT LIKE THEM WITH A MOUSE.',
  'I DO NOT LIKE THEM HERE OR THERE.',
  'I DO NOT LIKE THEM ANYWHERE.',
  'I DO NOT LIKE GREEN EGGS AND HAM.',
  'I DO NOT LIKE THEM, SAM-I-AM.'
];


module('Integration | Component | list-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with components and options', async function(assert) {

    this.set('items', ITEMS);

    await render(hbs`
      {{#list-group as |g|}}
        {{#each items as |item|}} 
          {{g.item text=item}}
        {{/each}}
      {{/list-group}}
    `);
    assert.dom('.list-group').exists();
    assert.dom('ul.list-group').exists();
    assert.equal(this.element.querySelectorAll('li').length, ITEMS.length, 'renders the correct number of list items');

    await render(hbs`
      {{#list-group flush=true as |g|}}
        {{#each items as |item|}} 
          {{g.item text=item}}
        {{/each}}
      {{/list-group}}
    `);

    assert.dom('.list-group-flush').exists();
  });
});
