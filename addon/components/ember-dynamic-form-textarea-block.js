import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form-textarea-block';

//component options
/*
 *value
 *label
 *cols
 *rows
 *required
 *textareaId
 *onValueUpdate - action
 */

export default Ember.Component.extend({
  layout,
  classNames: ['form-group'],
  attributeBindings: ['blockId:id'],

  oneWayValue: Ember.computed.oneWay('value'),
  label: 'You need to provide a label for this textarea',
  cols: 30,
  rows: 6,
  required: false,

  // if no textareaId provided use label
  textareaId: Ember.computed('label', function() {
    let random = Math.floor((Math.random() * 1000) + 1);
    return this.get('label').toLowerCase().replace(/ /g, '') + random;
  }),

  // id of this component block
  blockId: Ember.computed('textareaId', function() {
    return this.get('textareaId') + 'Block';
  }),

  oneWayValueChange: Ember.observer('oneWayValue', function() {
    let oneWayValue = this.get('oneWayValue');
    this.attrs.onValueUpdate(oneWayValue);
  })
});
