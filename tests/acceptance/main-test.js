import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const { Route, Component } = Ember;

moduleForAcceptance('Acceptance | main');

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
  this.register('route:dynamic', Route.extend({
    actions: {
      foo() {
        assert.ok(true, 'action was properly triggered on the route');
      }
    }
  }));

  this.register('template:dynamic', hbs`{{parent-component go=(route-action 'foo') }}`);
  this.register('template:components/parent-component', hbs`{{child-component go=go}}`);
  this.register('template:components/child-component', hbs`<button class="do-it">GO!</button>`);
  this.register('component:child-component', Component.extend({
    click() {
      this.attrs.go();
    }
  }));

  visit('/dynamic');
  click('.do-it');
});

test('it should throw an error if the route action is missing', function(assert) {
  this.register('route:dynamic', Route);
  this.register('template:dynamic', hbs`{{test-component go=(route-action 'doesNotExist')}}`);
  this.register('template:components/test-component', hbs`welp`);

  visit('/dynamic').catch(err => {
    const msg = 'Assertion Failed: [ember-route-action-helper] Unable to find action doesNotExist';
    assert.equal(err.message, msg);
  });
});
