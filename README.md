# ember-route-action-helper [![Build Status](https://travis-ci.org/dockyard/ember-route-action-helper.svg?branch=master)](https://travis-ci.org/dockyard/ember-route-action-helper) [![npm version](https://badge.fury.io/js/ember-route-action-helper.svg)](https://badge.fury.io/js/ember-route-action-helper)
*Credit: @rwjblue's [jsbin](http://jsbin.com/jipani/edit?html,js,output)*

Demo: http://jsbin.com/jipani/edit?html,js,output

The `route-action` helper allows you to bubble closure actions, which will delegate it to the currently active route hierarchy per the bubbling rules explained under `actions`. To use:

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
    }
  }
});
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

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
