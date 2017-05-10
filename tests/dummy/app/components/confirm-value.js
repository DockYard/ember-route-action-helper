import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  value: null,
  actions: {
    confirm() {
      this.set('value', this.get('doAction')());
    }
  }
});
