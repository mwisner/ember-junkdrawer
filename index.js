/* eslint-env node */
/* eslint-disable ember-suave/prefer-destructuring */
'use strict';

const Funnel = require('broccoli-funnel');
const BroccoliDebug = require('broccoli-debug');

const defaultOptions = {
  isDevelopingAddon: false
};

const componentDependencies = {};

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
