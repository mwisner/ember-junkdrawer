import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';


module('Integration | Component | changeset-provider', function(hooks) {
  setupRenderingTest(hooks);

  test('accepts model and yields changeset with errors', async function(assert) {
    assert.expect(2);
    let errorPayload = {
      "payload": {
        "errors": [
          {
            "status": "403",
            "source": { "pointer": "/data/attributes/secretPowers" },
            "detail": "Editing secret powers is not authorized on Sundays."
          },
          {
            "status": "422",
            "source": { "pointer": "/data/attributes/volume" },
            "detail": "Volume does not, in fact, go to 11."
          },
          {
            "status": "500",
            "source": { "pointer": "/data/attributes/reputation" },
            "title": "The backend responded with an error",
            "detail": "Reputation service not responding after three requests."
          }
        ]
      }
    };

    let fakeModel = EmberObject.create({
      secretPowers: true,
      volume: 10,
      reputation: 'B',
      save() {
        return new Promise((resolve, reject) => {
          reject(errorPayload);
        })
      }
    });
    this.set('model', fakeModel);
    this.set('handleErrors', function(data) {
      assert.ok(data.payload.errors.length, 'serverErrors called with error payload')
    });
    await render(hbs`
      {{#changeset-provider model=model onServerError=(action handleErrors) as |provider|}}
        {{#each provider.changeset.errors as |error|}}
          <li class="error">{{error.validation}}</li>
        {{/each}}
        <button onclick={{action provider.submit model}} id="error">{{model.title}}</button>
      {{/changeset-provider}}
    `);

    await click('#error');
    assert.dom('.error').exists({ count: 3 });
  });
});
