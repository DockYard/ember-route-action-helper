import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    add(x, y) {
      return this.set('controller.value', x + y);
    },
    square(x) {
      return this.set('controller.value', x * x);
    },
    triple(x) {
      return this.set('controller.value', x * 3);
    }
  }
});
