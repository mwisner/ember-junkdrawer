// BEGIN-SNIPPET close-button-usage.js

import Component from "@ember/component";

export default Component.extend({
  displayMessage: true,
  actions: {
    close() {
      this.set('displayMessage', false);
    }
  }
});
// END-SNIPPET
