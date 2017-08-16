# ember-route-action-helper ![Download count all time](https://img.shields.io/npm/dt/ember-route-action-helper.svg) [![CircleCI](https://circleci.com/gh/DockYard/ember-route-action-helper.svg?style=shield)](https://circleci.com/gh/DockYard/ember-route-action-helper) [![npm version](https://badge.fury.io/js/ember-route-action-helper.svg)](https://badge.fury.io/js/ember-route-action-helper)

**[ember-router-action-helper is built and maintained by DockYard, contact us for expert Ember.js consulting](https://dockyard.com/ember-consulting)**.

*Credit: @rwjblue's [jsbin](http://jsbin.com/jipani/edit?html,js,output)*

Demo: http://jsbin.com/jipani/edit?html,js,output

```no-highlight
ember install ember-route-action-helper
```

The `route-action` helper allows you to bubble closure actions, which will delegate it to the currently active route hierarchy per the bubbling rules explained under `actions`. Like closure actions, `route-action` will also have a return value.

However, returning `true` in an action will **not** preserve bubbling semantics. In case you would like that behavior, you should use ordinary string actions instead.

## Usage

For example, this route template tells the component to lookup the `updateFoo` action on the route when its internal `clicked` property is invoked, and curries the function call with 2 arguments.

```hbs
{{! foo/route.hbs }}
{{foo-bar clicked=(route-action "updateFoo" "Hello" "world")}}
```

If the action is not found on the current route, it is bubbled up:

```js
// application/route.js
import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  actions: {
    updateFoo(...args) {
      // handle action
      return 42;
    }
  }
});
```

If no action is found after bubbling, an error will be raised. The `route-action` also has a return value:

```js
// foo/component.js
import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    anotherAction(...args) {
      let result = this.get('updateFoo')(...args);

      console.log(result); // 42
    }
  }
});
```

You may also use in conjunction with the `{{action}}` helper:

```js
<button {{action (route-action 'updateFoo')}}>Update Foo</button>
```

## Compatibility

This addon will work on Ember versions `1.13.x` and up only, due to use of the new `Helper` implementation.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Overriding route-action for integration tests

This helper is designed for use in controller templates, not in
components. It will not, therefore, resolve route action references
in an integration test. If you are using this helper in your components,
you can override the helper using a pattern similar to the following:

```js
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('uses-route-action', 'Integration | Component | uses route action', {
  integration: true,
  beforeEach(assert) {
    this.container
      .registry
      .registrations['helper:route-action'] = Ember.Helper.helper((arg) => {
        return this.routeActions[arg];
      });
    this.routeActions = {
      doSomething(arg) {
        return Ember.RSVP.resolve({arg});
      },
    };
  },
});
```

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
