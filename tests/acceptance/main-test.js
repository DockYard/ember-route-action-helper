import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | main');

test('it sends a route action', function(assert) {
  visit('/thing');

  andThen(() => assert.equal(currentURL(), '/thing'));
  andThen(() => click('#foo-button'));
  andThen(() => assert.equal(findWithAssert('#foo-value').text().trim(), 'Hello world Bob!'));
});
