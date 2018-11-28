import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | ds-model-provider', function(hooks) {
  setupRenderingTest(hooks);

  test('it has success state', async function(assert) {
    assert.expect(3);
    let fakeModel = EmberObject.create({
      title: 'My Title',
      save() {
        return new Promise(resolve => {
          resolve(assert.ok(true, '`save` method is called on model'));
        });
      }
    });
    this.set('model', fakeModel);
    this.set('submitSuccess', function () {
      assert.ok(true, 'submitSuccess Callback called');
    });
    await render(hbs`
      {{#ds-model-provider model=model onSubmitSuccess=(action submitSuccess) as |provider|}}
        
        <button onclick={{action provider.submit model}} id="save">{{model.title}}</button>
       
      {{/ds-model-provider}}
    `);

    assert.dom('#save').hasText('My Title');
    click('#save');
  });
});
