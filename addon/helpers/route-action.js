import Ember from 'ember';
import { ACTION } from '../-private/internals';

const {
  A: emberArray,
  Helper,
  assert,
  computed,
  typeOf,
  get,
  getOwner,
  run,
  runInDebug
} = Ember;

function getRoutes(router) {
  return emberArray(router.router.currentHandlerInfos)
    .mapBy('handler')
    .reverse();
}

function getRouteWithAction(router, actionName) {
  let action;
  let handler = emberArray(getRoutes(router)).find((route) => {
    let actions = route.actions || route._actions;
    action = actions[actionName];

    return typeOf(action) === 'function';
  });

  return { action, handler };
}

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  compute([actionName, ...params]) {
    let router = get(this, 'router');
    assert('[ember-route-action-helper] Unable to lookup router', router);

    runInDebug(() => {
      let { handler } = getRouteWithAction(router, actionName);
      assert(`[ember-route-action-helper] Unable to find action ${actionName}`, handler);
    });

    let routeAction = function(...invocationArgs) {
      let { action, handler } = getRouteWithAction(router, actionName);
      let args = params.concat(invocationArgs);
      return run.join(handler, action, ...args);
    };

    routeAction[ACTION] = true;

    return routeAction;
  }
});
