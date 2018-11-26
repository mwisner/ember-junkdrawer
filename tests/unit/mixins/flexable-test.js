import EmberObject from '@ember/object';
import FlexableMixin from 'ember-junkdrawer/mixins/flexable';
import { module, test } from 'qunit';

module('Unit | Mixin | flexable', function() {
  // Replace this with your real tests.
  test('it passes in flexbox options correctly', function (assert) {
    let FlexableObject = EmberObject.extend(FlexableMixin);
    let subject = FlexableObject.create();
    assert.ok(subject.get('classNameBindings').indexOf('d-flex') <= 0);

    subject.setProperties({flex: true, align: 'center'});
    assert.ok(subject.get('classNameBindings').indexOf('d-flex') <= 0);
    assert.ok(subject.get('classNameBindings').indexOf('justify-content-center') <= 0);
  });
});
