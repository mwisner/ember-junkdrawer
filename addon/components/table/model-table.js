import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';
import { A } from "@ember/array";
import layout from '../../templates/table/model-table';

export default Component.extend({
  layout,
  store: service(),
  page: 0,
  page_size: 30,
  sort: 'name',
  recordType: null,
  recordQuery: {},
  isLoading: oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,
  model: A([]),
  meta: null,
  columns: null,
  table: null,

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

  },

  /**
   *
   */
  fetchRecords: task(function*() {
    let query = this.getProperties(['page', 'page_size', 'sort']);
    query = assign(query, this.get('recordQuery'));
    let records = yield this.get('store').query(this.get('recordType'), query);
    if (records.get('length')) {
      this.get('model').pushObjects(records.toArray());
      this.set('canLoadMore', true);
    } else {
      this.set('canLoadMore', false);
    }

  }).restartable(),

  /**
   *
   */
  resetTable() {
    this.setProperties({
      canLoadMore: true,
      page: 1,
      meta: null,
    });
    this.get('model').clear();
    this.get('fetchRecords').perform();
  },

  /**
   *
   */
  actions: {
    onScrolledToBottom() {
      console.log("eh?");
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.get('fetchRecords').perform();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.set(
          'sort',
          (column.ascending ? '' : '-') + column.get('valuePath')
        );
        this.resetTable();
      }
    }
  }
});
