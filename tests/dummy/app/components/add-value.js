import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  baseValue: 4,
  value: null,
  actions: {
    addValue(x) {
      this.set('value', this.get('add')(x));
    }
  }
});
