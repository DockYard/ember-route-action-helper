import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  actions: {
    updateFoo(...args) {
      return set(this, 'controller.foo', args.join(' '));
    },

    getMax(...numbers) {
      return Math.max.apply([], numbers);
    }
  }
});
