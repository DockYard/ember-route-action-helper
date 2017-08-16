import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  actions: {
    getMax(...numbers) {
      // contrived example, but demonstrates that the closure action has a
      // return value.
      return set(this, 'max', this.attrs.getMax(...numbers));
    }
  }
});
