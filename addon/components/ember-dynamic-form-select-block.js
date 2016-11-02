import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form-select-block';

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
  placeholder: 'Select',
  required: false,
  hasError: false,
  hasSuccess: false,
  isSelected: false,

  checkSelected: Ember.observer('selected', function() {
    let selected = this.get('selected');
    if (selected !== undefined) {
      this.set('hasError', false);
      this.set('hasSuccess', true);
      this.set('isSelected', true);
    } else {
      this.set('isSelected', false);
      this.set('hasSuccess', false);
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
    },
    checkSelected() {
      if (this.get('isSelected')) {
        this.set('hasError', false);
      } else {
        this.set('hasError', true);
      }
    }
  }
});
