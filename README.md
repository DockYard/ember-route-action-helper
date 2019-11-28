### WARNING
__You probably don't need to use this addon__. Most of the use cases you'd use this addon for are perfectly achievable without this addon. Read the following blog post for more info:
[Ember Best Practices: What are controllers good for?](https://dockyard.com/blog/2017/06/16/ember-best-practices-what-are-controllers-good-for)

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

## Contributors

We're grateful to these wonderful contributors who've contributed to `ember-route-action-helper`:

[//]: contributor-faces
<a href="https://github.com/poteto"><img src="https://avatars0.githubusercontent.com/u/1390709?v=4" title="poteto" width="80" height="80"></a>
<a href="https://github.com/martndemus"><img src="https://avatars2.githubusercontent.com/u/903637?v=4" title="martndemus" width="80" height="80"></a>
<a href="https://github.com/rwjblue"><img src="https://avatars0.githubusercontent.com/u/12637?v=4" title="rwjblue" width="80" height="80"></a>
<a href="https://github.com/nicomihalich"><img src="https://avatars0.githubusercontent.com/u/748245?v=4" title="nicomihalich" width="80" height="80"></a>
<a href="https://github.com/bcardarella"><img src="https://avatars0.githubusercontent.com/u/18524?v=4" title="bcardarella" width="80" height="80"></a>
<a href="https://github.com/Frozenfire92"><img src="https://avatars0.githubusercontent.com/u/5893112?v=4" title="Frozenfire92" width="80" height="80"></a>
<a href="https://github.com/kellyselden"><img src="https://avatars1.githubusercontent.com/u/602423?v=4" title="kellyselden" width="80" height="80"></a>
<a href="https://github.com/artemgurzhii"><img src="https://avatars2.githubusercontent.com/u/13109164?v=4" title="artemgurzhii" width="80" height="80"></a>
<a href="https://github.com/BnitoBzh"><img src="https://avatars0.githubusercontent.com/u/2962152?v=4" title="BnitoBzh" width="80" height="80"></a>
<a href="https://github.com/topaxi"><img src="https://avatars0.githubusercontent.com/u/213788?v=4" title="topaxi" width="80" height="80"></a>
<a href="https://github.com/kiwiupover"><img src="https://avatars3.githubusercontent.com/u/647691?v=4" title="kiwiupover" width="80" height="80"></a>
<a href="https://github.com/artzte"><img src="https://avatars1.githubusercontent.com/u/11142?v=4" title="artzte" width="80" height="80"></a>
<a href="https://github.com/jakesjews"><img src="https://avatars1.githubusercontent.com/u/481412?v=4" title="jakesjews" width="80" height="80"></a>
<a href="https://github.com/nucleartide"><img src="https://avatars3.githubusercontent.com/u/914228?v=4" title="nucleartide" width="80" height="80"></a>
<a href="https://github.com/rondale-sc"><img src="https://avatars0.githubusercontent.com/u/75710?v=4" title="rondale-sc" width="80" height="80"></a>
<a href="https://github.com/lukemelia"><img src="https://avatars2.githubusercontent.com/u/353?v=4" title="lukemelia" width="80" height="80"></a>
<a href="https://github.com/cibernox"><img src="https://avatars2.githubusercontent.com/u/265339?v=4" title="cibernox" width="80" height="80"></a>
<a href="https://github.com/yaymukund"><img src="https://avatars0.githubusercontent.com/u/590450?v=4" title="yaymukund" width="80" height="80"></a>
<a href="https://github.com/locks"><img src="https://avatars1.githubusercontent.com/u/32344?v=4" title="locks" width="80" height="80"></a>
<a href="https://github.com/Turbo87"><img src="https://avatars2.githubusercontent.com/u/141300?v=4" title="Turbo87" width="80" height="80"></a>

[//]: contributor-faces
