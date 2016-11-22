import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form-pikaday-input';

//component options
/*
 *value
 *label
 *icon
 *iconRight
 *required
 *placeholder
 *format
 *inputId
 *onValueUpdate - action
 */

export default Ember.Component.extend({
  layout,
  classNames: ['form-group'],
  attributeBindings: ['blockId:id'],

  oneWayValue: Ember.computed.oneWay('value'),
  label: 'You need to provide a label for this input',
  iconRight: false,
  required: false,
  hasError: false,
  hasSuccess: false,

  // if no inputId provided use label
  inputId: Ember.computed('label', function() {
    let random = Math.floor((Math.random() * 1000) + 1);
    return this.get('label').toLowerCase().replace(/ /g, '') + random;
  }),

  // id of this component block
  blockId: Ember.computed('inputId', function() {
    return this.get('inputId') + 'Block';
  }),

  oneWayValueChange: Ember.observer('oneWayValue', function() {
    let oneWayValue = this.get('oneWayValue');
    let hasError = this.checkValid(oneWayValue);
    this.set('hasError', hasError);
    this.set('hasSuccess', !hasError);
    this.attrs.onValueUpdate(oneWayValue);
  }),

  checkValid: function(value) {
    let inputId = this.get('inputId');
    if (this.get('required') && Ember.isBlank(value)) {
      return true;
    } else {
      // the validity object contains a valid property which is set to
      // true (so invert in return) if all validity elements have passed
      return !document.getElementById(inputId).validity.valid;
    }
  },

  actions: {
    setDate(value) {
      this.set('oneWayValue', value);
    }
  }
});
