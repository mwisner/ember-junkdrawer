import CurrentUser from 'ember-junkdrawer/services/current-user';
import { inject as service } from '@ember/service';

export default CurrentUser.extend({
    didSetupUser(user) {},
    didSetupOrganization(organization) {},
})
