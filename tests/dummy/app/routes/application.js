import Ember from 'ember';

const { Route, set } = Ember;

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
