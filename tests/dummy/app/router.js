import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('thing', function() {
    this.route('show');
    this.route('route-with-action');
  });
  this.route('dynamic');
  this.route('dynamic2');
  this.route('dynamic3');
});

export default Router;
