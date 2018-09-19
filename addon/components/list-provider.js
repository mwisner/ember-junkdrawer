import Component from '@ember/component';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';
import { A } from "@ember/array";
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

import layout from '../templates/components/list-provider';

export default Component.extend({
  layout,
  store: service(),
  page: 1,
  page_size: 30,
  sort: 'name',
  recordType: null,
  canLoadMore: true,
  list: A([]),
  meta: null,
  defaultRecordQuery: null,

  didReceiveAttrs() {
    assert('Must provide valid `recordType`', this.recordType);
    assert('Must provide a valid function for `hookPreQueryAlter`', typeOf(this.hookPreQueryAlter), 'function');
    this.setProperties({
      table: null,
      model: A([]),
      canLoadMore: true,
    });
    this.get('loadList').perform()
  },

  /**
   * Provide hook allowing consumers to update query
   * @public
   * @param  {Object} query Key/value pairs of query params to be passed
   * @return {Object}       updated query
   */
  hookPreQueryAlter(query) {
    return query;
  },

  loadList: task(function*(query = {}) {
    let defaults = this.getProperties('page', 'page_size', 'sort');
    defaults = Object.assign(defaults, this.defaultRecordQuery);
    query = Object.assign(defaults, query);
    query = this.hookPreQueryAlter(query);

    let records = yield this.get('store')
      .query(this.get('recordType'), query)
      .catch(() => {
        return A([]);
      });

    if (records.get('length')) {
      this.get('list').pushObjects(records.toArray());
    }

    //
    // JSON API format
    if (records.get("meta.pagination.page")) {
      if (records.get("meta.pagination.page") < records.get("meta.pagination.pages")) {
        this.set('canLoadMore', true);
        this.set('page', records.get("meta.pagination.page") + 1);
      } else {
        this.set('canLoadMore', false);
      }

    //
    // Fall back to shoddy non-json api strategy, here we wait until our first 404 and then stop.
    } else {
      if (records.get('length')) {
        this.set('canLoadMore', true);
        this.incrementProperty('page')
      }
      else {
        this.set('canLoadMore', false);
      }
    }
  }).restartable(),

  resetTable(reloadData) {
    this.setProperties({
      canLoadMore: true,
      page: 1,
    });
    this.get('list').clear();
    if (reloadData) {
      this.get('loadList').perform();
    }
  },

  actions: {
    update(query) {
      this.get('loadList').perform(query);
    },
    resetTable(reloadData=false) {
      this.resetTable(reloadData);
    }
  }

});
