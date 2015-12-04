import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

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

