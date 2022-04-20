import { A as emberArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { join } from '@ember/runloop';
import { runInDebug, assert } from '@ember/debug';
import { ACTION } from '../-private/internals';

function getCurrentInfos(router) {
  let routerLib = router._routerMicrolib || router.router;

  return {
    currentInfos: routerLib.currentRouteInfos || routerLib.currentHandlerInfos,
    mapBy: routerLib.currentRouteInfos && 'route' || 'handler'
  }
}

function getRoutes(router) {
  const { currentInfos, mapBy } = getCurrentInfos(router);
  return emberArray(currentInfos)
    .mapBy(mapBy)
    .reverse();
}

function getRouteWithAction(router, actionName) {
  let action;
  let handler = emberArray(getRoutes(router)).find((route) => {
    let actions = route.actions || route._actions;
    action = actions[actionName];

    return typeof(action) === 'function';
  });

  return { action, handler };
}

export default Helper.extend({
  router: readOnly(function() {
    return getOwner(this).lookup('router:main');
  }),

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
      return join(handler, action, ...args);
    };

    routeAction[ACTION] = true;

    return routeAction;
  }
});
