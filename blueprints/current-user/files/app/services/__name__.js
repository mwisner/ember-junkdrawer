import CurrentUser from 'ember-junkdrawer/services/current-user';
import {inject as service} from '@ember/service';
import {get, set} from '@ember/object';

export default CurrentUser.extend({
    didSetupUser(user) {},
    didSetupOrganization(organization) {},
})