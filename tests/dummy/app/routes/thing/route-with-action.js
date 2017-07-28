import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  actions: {
    updateFoo(...args) {
      let applicationController = this.controllerFor('application');
      return set(applicationController, 'foo', 'Set via route-with-action: ' + args.join(' '));
    }
  }
});
