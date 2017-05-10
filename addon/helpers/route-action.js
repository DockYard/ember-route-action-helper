import Ember from 'ember';
import { ACTION } from '../-private/internals';

const {
  Helper,
  assert,
  canInvoke,
  computed,
  get,
  getOwner,
  run,
  isPresent,
  // @ts-ignore no type signature
  runInDebug
} = Ember;

/**
 * @typedef {Object} RouterInstance
 * @property {Router} _routerMicrolib
 * @property {Router} router
 * @property {string} currentRouteName
 */
/**
 * @typedef {Object} Router
 * @property {Handler[]} currentHandlerInfos
 * */
/**
 * @typedef {Object} Handler
 * @property {string} name
 * @property {Route} handler
 * */
/**
 * @typedef {Object} Route
 * @property {ActionsHash} actions
 * @property {ActionsHash} _actions
 * */
/**
 * @typedef {Object} ActionsHash
 * @property {[propName: string]: function(): void}
 */
/**
 * @typedef {Object} RouteAction
 * @property {function(): void} action
 * @property {Route} handler
 * */

/**
 * Get current handler infos from the router.
 *
 * @param {RouterInstance} router
 * @returns {Handler[]}
 */
function getCurrentHandlerInfos(router) {
  let routerLib = router._routerMicrolib || router.router;
  return routerLib.currentHandlerInfos;
}

/**
 * Get current handler instances from router.
 *
 * @param {RouterInstance} router
 * @returns {Route[]}
 */
function getCurrentHandlers(router) {
  /** @type {string} */
  let currentRouteName = get(router, 'currentRouteName');
  let currentRoot = currentRouteName.replace(/\.index$/gi, '');
  return getCurrentHandlerInfos(router)
    .reduce((acc, h) => {
      return h.name === currentRouteName || h.name === currentRoot
        ? [h.handler, ...acc]
        : acc;
    }, []);
}

/**
 * Get current route handler and action.
 *
 * @param {RouterInstance} router
 * @param {string} actionName
 * @returns {RouteAction}
 */
function getCurrentRouteWithAction(router, actionName) {
  /** @type {function(): void} */
  let action;
  /** @type {Route} */
  let handler = getCurrentHandlers(router).find((route) => {
    /** @type {ActionsHash} */
    let actions = route.actions || route._actions;
    action = actions[actionName];
    return canInvoke(actions, actionName);
  });
  return { action, handler };
}

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  /**
   * @param {any} [actionName, ...params]
   * @returns {function(...invocationArgs: any[]): void}
   */
  compute([actionName, ...params]) {
    /** @type {RouterInstance} */
    let router = get(this, 'router');
    assert('[ember-route-action-helper] Unable to lookup router', isPresent(router));

    runInDebug(() => {
      let { handler } = getCurrentRouteWithAction(router, actionName);
      assert(`[ember-route-action-helper] Unable to find action ${actionName}`, isPresent(handler));
    });

    let routeAction = function(...invocationArgs) {
      let { action, handler } = getCurrentRouteWithAction(router, actionName);
      let args = params.concat(invocationArgs);
      return run.join(handler, action, ...args);
    };

    routeAction[ACTION] = true;

    return routeAction;
  }
});
