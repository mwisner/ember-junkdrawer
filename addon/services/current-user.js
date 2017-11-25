import Service, {inject as service} from '@ember/service';
import {computed, set, get} from '@ember/object';
import {assert} from '@ember/debug';
import {task} from 'ember-concurrency';

/**
 * Current user service.
 *
 * TODO:
 * -- Make route transitions configurable / optional
 * -- Make Feature setting configurable / optional
 */
export default Service.extend({
  router: service(),
  session: service(),
  store: service(),
  features: service(),
  intercom: service(),
  flashMessages: service(),

  initAppTask: null,

  currentUser: null,
  organizations: null,
  currentOrganization: null,

  user: computed('currentUser', function () {
    return this.get('currentUser');
  }),

  user_id: computed('currentUser', function () {
    return this.get('currentUser.id');
  }),

  organization: computed('currentOrganization', function () {
    return this.get('currentOrganization');
  }),

  /**
   * Task / Load User
   */
  loadUser: task(function* () {
    return yield this.get('store')
      .query('user', {current: true})
      .then(users => {
        const user = users.get('firstObject');
        set(this, 'currentUser', user);
        return user;
      })
      .catch(() => {
        return null;
      });
  }).drop(),

  /**
   * Task / Load Organizations
   */
  loadOrganizations: task(function* () {
    let organizations = yield get(this, 'currentUser.organizations');
    set(this, 'organizations', organizations);
    return organizations;
  }).drop(),

  /**
   * Set the initial active organization.
   */
  setActiveOrganization: task(function* () {
    let organizations = yield this.get('organizations');
    if (!organizations.length) {
      return null;
    }

    //
    // Find recommended organization id.
    let currentOrganizationId = this.get('session').get(
      'data.currentOrganizationId'
    );

    //
    // If we don't have a stored id, load the first one.
    if (!currentOrganizationId) {
      let organization = organizations.get('firstObject');
      set(this, 'currentOrganization', organization);
      this.get('session').set(
        'data.currentOrganizationId',
        organization.get('id')
      );
      return organization;
    }

    //
    // First we attempt to load based on the user.organizations attribute.
    // In most situations the id will be part of this list. However in the situation
    // that the user is an admin, and attempting to impersonate access, we allow in this situation
    // to load the organization. It's the responsibility of the API to ensure that the user
    // can access organizations in this situation.
    let organization = organizations.findBy('id', currentOrganizationId);
    if (organization) {
      set(this, 'currentOrganization', organization);
      return organization;
    } else {
      return yield this.get('store')
        .findRecord('organization', currentOrganizationId)
        .then(data => {
          set(this, 'currentOrganization', data);
          return data;
        })
        .catch(() => {
          // Load user's default organization.
          let organization = organizations.get('firstObject');
          set(this, 'currentOrganization', organization);
          return organization;
        });
    }

  }).drop(),

  /**
   * Ran after user has logged in.
   */
  userLogin: task(function* () {
    if (!this.get('currentUser')) {
      yield this.get('setupEverything').perform();
    }

    if (!this.get('currentUser')) {
      return false;
    }

    let payload = {
      data: {
        type: 'users',
        attributes: {}
      }
    };

    let invite = this.get('session').get('data.invite');
    if (invite) {
      payload['data']['attributes']['invite'] = invite['id'];
    }

    return yield this.get('currentUser')
      .login(payload)
      .then(() => {
        return this.get('store')
          .findRecord('user', this.get('user.id'), {reload: true})
          .then(user => {
            this.set('currentUser', user);

            if (invite) {
              this.get('session').set('data.invite', null);
              window.location.href = '/dashboard';
            }
          })
          .catch(() => {
            this.set('currentUser', null);
          });
      });
  }).drop(),

  /**
   * A parent task used to execute and orchestrate everything
   *
   * Tasks:
   * 1) Load User
   * 2) Set User Features
   * 3) Load Organizations
   * 4) Select Active Organization
   * 5) Set Organization Features
   */
  setupEverything: task(function* () {
    //
    // Load Current User
    const user = yield this.get('loadUser').perform();
    if (!user) {
      return 'invalidate';
    }
    this._set_user_features();
    this._set_intercom_data();
    
    this.didSetupUser(user);
    //
    // Load Organizations
    const organizations = yield this.get('loadOrganizations').perform();
    if (organizations) {
      const organization = yield this.get('setActiveOrganization').perform();
      if (organization) {
        this._set_organization_features();
        this.didSetupOrganization(organization);
      }
    }

    

    return true;
  }).drop(),

  /**
   * We wrap a normal method around the task so that nobody has to remember
   * to call perform().
   */
  initApp() {
    let taskInstance = null;
    if (this.get('initAppTask') && this.get('initAppTask.isRunning')) {
      taskInstance = this.get('initAppTask');
    } else {
      taskInstance = this.get('setupEverything').perform();
      this.set('initAppTask', taskInstance);
    }

    taskInstance.then(() => {
      if (this.get('user') && !this.get('organization')) {
        this.get('router').transitionTo('onboarding.registration');
      }
    });

    return taskInstance;
  },

  /**
   *
   */
  sessionAuthenticated() {
    return this.get('userLogin')
      .perform()
      .then(() => {
        if (!this.get('user')) {
          this.get('session').invalidate();
          this.get('flashMessages').danger(
            'An error occurred loading your account.'
          );
          this.get('router').transitionTo('anon.login');
        }
      });
  },

  /**
   * When switching the organization we simply set the session id
   * and then reload the entire application.
   */
  switchOrganization(organization) {
    this.get('session').set(
      'data.currentOrganizationId',
      organization.get('id')
    );
    window.location.href = '/dashboard';
  },

  /**
   * Set User Features
   * @private
   */
  _set_user_features() {
  },

  /**
   * Set Intercom Data
   * @private
   */
  _set_intercom_data() {
    let intercomData = {
      name: this.get('currentUser.name'),
      email: this.get('currentUser.username'),
      user_is_admin: this.get('currentUser.user_is_admin'),
      user_is_staff: this.get('currentUser.user_is_staff')
    };
    get(this, 'intercom').set('user', intercomData);
  },

  /**
   * Hook to setup user
   * Noop without user implementation
   * @public
   * @param {*} user 
   */
   didSetupUser() {},

   /**
    * Hook to setup organization
    * Noop without user implmentation
    * @public
    * @param {*} organization 
    */
   didSetupOrganization() {},

  /**
   * @private
   * Set Organization Features
   */
  _set_organization_features() {
    //
    // Set organization features.
    if (
      this.get('currentOrganization.features') &&
      this.get('currentOrganization.features').length
    ) {
      this.get('currentOrganization.features').forEach(feature => {
        this.get('features').enable('organization-' + feature);
      });
    }

    const map = {
      user_is_owner: 'organization-owner',
      user_is_admin: 'organization-admin',
      user_is_member: 'organization-member'
    };

    for (let [key, value] of Object.entries(map)) {
      if (this.get('currentOrganization').get(key)) {
        this.get('features').enable(value);
      } else {
        this.get('features').disable(value);
      }
    }
  },

});
