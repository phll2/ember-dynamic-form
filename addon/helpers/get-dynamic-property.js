import Ember from 'ember';

export function getDynamicProperty([object, property]) {
  return Ember.get(object, property);
}

export default Ember.Helper.helper(getDynamicProperty);
