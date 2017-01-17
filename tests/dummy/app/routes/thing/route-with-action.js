import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  actions: {
    updateFoo(...args) {
      let applicationController = this.controllerFor('application');
      return set(applicationController, 'foo', 'Set via route-with-action: ' + args.join(' '));
    }
  }
});
