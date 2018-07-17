import isEmptyObject from 'dummy/utils/is-empty-object';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Utility | isEmptyObject', function(hooks) {

  // Replace this with your real tests.
  test('Can do the basics', function(assert) {
    let empty = {},
        full = {foo: 'bar'};

    assert.ok(isEmptyObject(empty));
    assert.notOk(isEmptyObject(full));
  });

  test('Returns true for Ember Object and non-objects', function(assert) {
    let eo = EmberObject.create();
    assert.notOk(isEmptyObject(eo));
    assert.notOk(isEmptyObject('foo'));
    assert.notOk(isEmptyObject(() => {return true}));
    assert.notOk(isEmptyObject(1));
    assert.notOk(isEmptyObject(true));
  });
});
