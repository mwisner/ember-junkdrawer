import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    myAction() {
    },
    logStuff() {
      console.log('Im like "Hey, whats up? Hello"');
    },
    alertStuff() {
      alert('You wanted an alert? You get an alert')
    }
  }
});
