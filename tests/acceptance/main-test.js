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
    this.application.register('template:dynamic', hbs`{{parent-component go=(route-action 'foo') }}`);
    this.application.register('template:dynamic2', hbs`{{parent-component go=(route-action 'notAnAction')}}`);
    this.application.register('template:components/parent-component', hbs`{{child-component go=go}}`);
    this.application.register('template:components/child-component', hbs`<button class="do-it">GO!</button>`);
    this.application.register('component:child-component', Component.extend({
      click() {
        this.get('go')();
      }
    }));
  }
});

test('it has a return value', function(assert) {
  visit('/math');

  andThen(() => assert.equal(currentURL(), '/math'));
  andThen(() => click('#math-1'));
  andThen(() => assert.equal(findWithAssert('#math-value').text().trim(), '3'));
  andThen(() => click('#math-2'));
  andThen(() => assert.equal(findWithAssert('#math-value').text().trim(), '16'));
  andThen(() => click('#math-3'));
  andThen(() => assert.equal(findWithAssert('#math-value').text().trim(), '15'));
  andThen(() => click('.confirm-value-button'));
  andThen(() => assert.equal(findWithAssert('.confirm-value').text().trim(), 'My value is 25'));
});

test('it can be partially applied', function(assert) {
  visit('/math');

  andThen(() => click('.add-value-button'));
  andThen(() => assert.equal(findWithAssert('.add-value').text().trim(), 'My value is 7'));
});

test('it invokes action in the current route hierarchy', function(assert) {
  visit('/math');
  andThen(() => click('#math-1'));
  andThen(() => assert.equal(findWithAssert('#math-value').text().trim(), '3'));
  visit('/math/add');
  andThen(() => click('#math-add-1'));
  andThen(() => assert.equal(findWithAssert('#math-add-value').text().trim(), '[math/add] Value is: 3'));
});

test('it handles .index routes', function(assert) {
  visit('/hello');
  andThen(() => click('#hello-index-button'));
  andThen(() => assert.equal(findWithAssert('#hello-index-value').text().trim(), 'Hello from hello.index'));
  andThen(() => click('#hello-button-1'));
  andThen(() => assert.equal(findWithAssert('#hello-value').text().trim(), '', 'should not fire because `hello.index` action takes precedence'));
  andThen(() => click('#hello-button-2'));
  andThen(() => assert.equal(findWithAssert('#hello-value').text().trim(), 'HELLO FROM HELLO'));
});

test('it can be used without rewrapping with (action (route-action "foo"))', function() {
  visit('/dynamic');
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
