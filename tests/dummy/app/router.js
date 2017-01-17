import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
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
});

export default Router;
