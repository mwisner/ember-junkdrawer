/* eslint-env node */
/* eslint-disable ember-suave/prefer-destructuring */
'use strict';

const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');

const defaultOptions = {
  isDevelopingAddon: false
};

const componentDependencies = {};

/**
 * I'm not really sure how to make this dynamic, so we use a shoddy file map
 * to make explicit tree-shaking a thing
 * @type {{}}
 */
const fileMap = {
  'components/bs-form/element/control/avatar.js': 'form-control:avatar',
  'templates/bs-form/element/control/avatar.hbs': 'form-control:avatar',
  'bs-form/element/control/avatar.hbs': 'form-control:avatar',

  'components/form/changeset-form.js': 'component:changeset-form',

  'components/ui/simple-form-group.js': 'component:simple-form-group',
  'templates/ui/simple-form-group.hbs': 'component:simple-form-group',
  'ui/simple-form-group.hbs': 'component:simple-form-group',

  'components/ui/table-loader.js': 'component:table-loader',
  'templates/ui/table-loader.hbs': 'component:table-loader',
  'ui/table-loader.hbs': 'component:table-loader',

  'components/ui/thing-list-item.js': 'component:thing-list-item',
  'templates/ui/thing-list-item.hbs': 'component:thing-list-item',
  'ui/thing-list-item.hbs': 'component:thing-list-item',

  'components/ui/thing-list.js': 'component:thing-list',
  'templates/ui/thing-list.hbs': 'component:thing-list',
  'ui/thing-list.hbs': 'component:thing-list',

  'components/ui/ui-box.js': 'component:ui-box',
  'templates/ui/ui-box.hbs': 'component:ui-box',
  'ui/ui-box.hbs': 'component:ui-box',

  'helpers/ui-page-property.js': 'helper:ui-page-property',

  'mixins/model-data-table-common.js': 'mixin:model-data-table-common',

  'services/current-user.js': 'service:current-user',
  'services/ui-global.js': 'service:ui-global',

  'components/close-button.js': 'component:close-button',
  'components/bs-card': 'component:bs-card',
  'components/changeset-form': 'component:changeset-form',
  'components/changeset-provider': 'component:changeset-provider',
  'components/close-button': 'component:close-button',
  'components/ds-model-provider': 'component:ds-model-provider',
  'components/list-provider': 'component:list-provider'
};

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
// https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

module.exports = {
  name: 'ember-junkdrawer',

  isDevelopingAddon() {
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    let { isDevelopingAddon } = Object.assign(
      {},
      defaultOptions,
      app.options['ember-junkdrawer']
    );

    return isDevelopingAddon;
  },

  init() {
    this._super.init.apply(this, arguments);
    this.debugTree = BroccoliDebug.buildDebugCallback(
      `ember-junkdrawer:${this.name}`
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    this.app = app;

    this.junkdrawerOptions = Object.assign(
      {},
      defaultOptions,
      app.options['ember-junkdrawer']
    );
  },

  treeForAddon(tree) {
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-tree:tree-shaken');

    return this._super.treeForAddon.call(this, tree);
  },

  treeForAddonTemplates(tree) {
    tree = this.filterComponents(tree);
    tree = this.debugTree(tree, 'addon-templates-tree:tree-shaken');

    return this._super.treeForAddonTemplates.call(this, tree);
  },

  filterComponents(tree) {
    let whitelist = this.generateWhitelist(this.junkdrawerOptions.whitelist);
    let blacklist = this.junkdrawerOptions.blacklist || [];

    // exit early if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      return tree;
    }

    return new Funnel(tree, {
      exclude: [name => this.excludeComponent(name, whitelist, blacklist)]
    });
  },

  excludeComponent(name, whitelist, blacklist) {
    let regex = /^(templates\/)?components\/|(services\/|helpers\/|mixins\/|utils\/)/;
    let isExcludable = regex.test(name);
    if (!isExcludable) {
      return false;
    }

    let baseName = name.replace(regex, '');
    let firstSeparator = baseName.indexOf('/');

    if (firstSeparator === 0) {
      baseName = baseName.substring(1);
    }

    baseName = baseName.substring(0, baseName.lastIndexOf('.'));
    let isWhitelisted = whitelist.some(el => {
      return baseName.includes(el);
    });
    let isBlacklisted = blacklist.some(el => {
      return baseName.includes(el);
    });

    if (whitelist.length === 0 && blacklist.length === 0) {
      return false;
    }

    if (whitelist.length && blacklist.length === 0) {
      return !isWhitelisted;
    }

    return isBlacklisted;
  },

  generateWhitelist(whitelist) {
    let list = [];

    if (!whitelist) {
      return list;
    }

    function _addToWhitelist(item) {
      if (list.indexOf(item) === -1) {
        list.push(item);

        if (componentDependencies[item]) {
          componentDependencies[item].forEach(_addToWhitelist);
        }
      }
    }

    whitelist.forEach(_addToWhitelist);
    return list;
  }
};
