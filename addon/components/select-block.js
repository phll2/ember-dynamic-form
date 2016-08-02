import Ember from 'ember';
import layout from '../templates/components/select-block';

//component options
/*
 *label
 *options = [{ value:"1", label:"the displayed text" }]
 *selected
 *selectId
 *required
 *icon
 *iconRight
 *placeholder
 *onOptionSelect - action
 */

export default Ember.Component.extend({
  layout,
  classNames: ['form-group'],
  attributeBindings: ['blockId:id'],

  label: 'You need to provide a label for this select',
  required: false,
  placeholder: 'Select',

  isSelected: Ember.computed('selected', function() {
    let selected = this.get('selected');
    if (selected !== undefined) {
      return selected;
    } else {
      return null;
    }
  }),

  // if no selectId provided use label
  selectId: Ember.computed('label', function() {
    let random = Math.floor((Math.random() * 1000) + 1);
    return this.get('label').toLowerCase().replace(/ /g, '') + random;
  }),

  blockId: Ember.computed('selectId', function() {
    return this.get('selectId') + 'Block';
  }),

  actions: {
    setOption(id) {
      this.attrs.onOptionSelect(id);
    }
  }
});
