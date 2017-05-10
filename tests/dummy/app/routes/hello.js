import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    greet() {
      return this.set('controller.value', 'Hello from hello');
    },
    yell() {
      return this.set('controller.value', 'HELLO FROM HELLO');
    }
  }
});
