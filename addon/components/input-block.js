import Ember from 'ember';
import layout from '../templates/components/input-block';

//component options
/*
 *type
 *value
 *label
 *icon
 *iconRight
 *required
 *placeholder
 *pattern
 *inputId
 *onValueUpdate - action
 */

export default Ember.Component.extend({
  layout,
  classNames: ['form-group'],
  attributeBindings: ['blockId:id'],

  type: 'text',
  oneWayValue: Ember.computed.oneWay('value'),
  label: 'You need to provide a label for this input',
  iconRight: false,
  required: false,

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
    this.attrs.onValueUpdate(oneWayValue);
  })
});
