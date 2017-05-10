import { test, skip } from 'ember-qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const { Route, Component } = Ember;

moduleForAcceptance('Acceptance | main', {
  beforeEach: function(assert) {
    this.application.register('route:dynamic', Route.extend({
      actions: {
        foo() {
          assert.ok(true, 'action was properly triggered on the route');
        }
      }
    }));
    this.application.register('route:dynamic3', Route.extend({
      actions: {
        async bar() {
          assert.ok(true, 'async functions are found');
        }
      }
    }));
    this.application.register('template:dynamic', hbs`{{parent-component go=(route-action 'foo') }}`);
    this.application.register('template:dynamic2', hbs`{{parent-component go=(route-action 'notAnAction')}}`);
    this.application.register('template:dynamic3', hbs`{{parent-component go=(route-action 'bar')}}`);
    this.application.register('template:components/parent-component', hbs`{{child-component go=go}}`);
    this.application.register('template:components/child-component', hbs`<button class="do-it">GO!</button>`);
    this.application.register('component:child-component', Component.extend({
      click() {
        this.get('go')();
      }
    }));
  }
});

test('it bubbles a route action', function(assert) {
  visit('/thing');

  andThen(() => assert.equal(currentURL(), '/thing'));
  andThen(() => click('.foo-button'));
  andThen(() => assert.equal(findWithAssert('.foo-value').text().trim(), 'Hello world Bob!'));
});

test('it has a return value', function(assert) {
  visit('/thing');

  andThen(() => assert.equal(currentURL(), '/thing'));
  andThen(() => click('.thing .max-button'));
  andThen(() => assert.equal(findWithAssert('.thing .max-value').text().trim(), '20'));

  // changing routes, 2 helpers invoked
  andThen(() => visit('/thing/show'));
  andThen(() => assert.equal(currentURL(), '/thing/show'));
  andThen(() => click('.thing-show .max-button'));

  // ensure values are different
  andThen(() => assert.equal(findWithAssert('.thing .max-value').text().trim(), '20'));
  andThen(() => assert.equal(findWithAssert('.thing-show .max-value').text().trim(), '300'));
});

test('it can be used without rewrapping with (action (route-action "foo"))', function(assert) {
  assert.expect(1);
  visit('/dynamic');
  click('.do-it');
});

test('it works with async functions', function(assert) {
  assert.expect(1);
  visit('/dynamic3');
  click('.do-it');
});

skip('it should throw an error immediately if the route action is missing', function(/* assert */) {
  // Ember.assert is now async, need to figure out how to use ember-qunit-assert-helpers correctly
  // let done = assert.async();
  // assert.expectAssertion(() => {
  //   visit('/dynamic2');
  //   let expectedResult = 'Assertion Failed: [ember-route-action-helper] Unable to find action notAnAction';
  //   andThen().catch(({ message }) => {
  //     assert.equal(message, expectedResult);
  //     done();
  //   });
  // });
});

test('it invokes action in the current route hierarchy', function(assert) {
  visit('/thing');
  click('.foo-button');
  andThen(() => assert.equal(findWithAssert('.foo-value').text().trim(), 'Hello world Bob!'));
  visit('/thing/route-with-action');
  click('.foo-button');
  andThen(() => assert.equal(findWithAssert('.foo-value').text().trim(), 'Set via route-with-action: Hello world Bob!'));
});
