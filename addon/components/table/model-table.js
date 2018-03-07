import Component from '@ember/component';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';
import { A } from "@ember/array";

import layout from '../../templates/table/model-table';

export default Component.extend({
  layout,
  store: service(),
  page: 1,
  page_size: 30,
  sort: 'name',
  recordType: null,
  recordQuery: {},
  defaultRecordQuery: {},
  isLoading: oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,
  model: A([]),
  meta: null,
  columns: [],
  table: null,
  tableOptions: {},
  internalTableOptions: computed('tableOptions', function() {

    let defaults = {
      height: '65vh',
      canSelect: false,
      expandOnClick: false,
      responsive: false,
    };

    return Object.assign(defaults, this.get('tableOptions'));
  }),

  postTableSetup: null,

  /**
   *
   */
  init() {
    this._super(...arguments);
    this.setProperties({
      table: null,
      model: A([]),
      canLoadMore: true,
    });

  },

  /**
   *
   */
  didReceiveAttrs() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), {
      enableSync: this.get('enableSync')
    });

    let sortColumn = table
      .get('allColumns')
      .findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
    if (this.get('postTableSetup')) {
      this.get('postTableSetup')(table);
    }
  },

  /**
   *
   */
  fetchRecords: task(function*() {
    let query = this.getProperties(['page', 'page_size', 'sort']);
    query = assign(query, this.get('recordQuery'));

    let records = yield this.get('store')
      .query(this.get('recordType'), query)
      .catch(() => {
        return A([]);
      });

    if (records.get('length')) {
      this.get('model').pushObjects(records.toArray());
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

  /**
   *
   */
  resetTable() {
    this.setProperties({
      canLoadMore: true,
      page: 1,
    });
    this.get('model').clear();
    this.get('fetchRecords').perform();
  },

  actions: {

    /**
     *
     */
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        //this.incrementProperty('page');
        this.get('fetchRecords').perform();
      }
    },

    /**
     *
     * @param column
     */
    onColumnClick(column) {
      if (column.sorted) {
        this.set(
          'sort',
          (column.ascending ? '' : '-') + column.get('valuePath')
        );
        this.resetTable();
      }
    },

    /**
     *
     * @param matches
     */
    onAfterResponsiveChange(matches) {
      if (matches.indexOf('jumbo') > -1) {
        this.get('table.expandedRows').setEach('expanded', false);
      }
    }
  }
});
