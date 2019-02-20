const assert = require('assert'),
  addonIndex = require('../index');
describe('index', function() {
  describe('excludeComponent', function() {
    let nestedAddonPaths = [
      'components/ui/ui-box.js',
      'templates/components/ui/ui-box.hbs',
      'components/ui/ui-box/ui-box-body.js',
      'templates/components/ui/ui-box/ui-box-body.hbs'
    ];

    nestedAddonPaths.forEach(path => {
      describe(`it works for ${path}`, function() {
        it('should return `true` if the file is in the blacklist', function() {
          let result = addonIndex.excludeComponent(path, [], ['ui-box']);
          assert.ok(result);
        });

        it('should return `false` if the file is in the whitelist', function() {
          let result = addonIndex.excludeComponent(path, ['ui-box'], []);
          assert.ok(!result);
        });

        it('should return `true` if the file is in both the whitelist and blacklist', function() {
          let result = addonIndex.excludeComponent(
            path,
            ['ui-box'],
            ['ui-box']
          );
          assert.ok(result);
        });

        it('should return `false` if file is not listed', function() {
          let result = addonIndex.excludeComponent(path, [], []);
          assert.ok(!result);
        });

        it('should work with additional paths', function() {
          let result = addonIndex.excludeComponent(path, [], ['ui/ui-box']);
          assert.ok(result);
        });
      });
    });
  });
});
