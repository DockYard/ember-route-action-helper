import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('math', function() {
    this.route('add');
  });
  this.route('hello', function() {
    this.route('world');
  })
  this.route('dynamic');
  this.route('dynamic2');
});

export default Router;
