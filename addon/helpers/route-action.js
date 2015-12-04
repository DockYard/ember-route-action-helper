import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const {
  Helper,
  assert,
  computed,
  get
} = Ember;

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  compute([actionName, ...params]) {
    let router = get(this, 'router');
    assert('[ember-route-action-helper] Unable to lookup router', router);

    return function(...invocationArgs) {
      let args = params.concat(invocationArgs);

      router.send(actionName, ...args);
    };
  }
});
