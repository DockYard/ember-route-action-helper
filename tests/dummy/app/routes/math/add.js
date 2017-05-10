import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    add(x, y) {
      return this.set('controller.value', `[math/add] Value is: ${x + y}`);
    }
  }
});
