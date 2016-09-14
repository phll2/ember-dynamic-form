import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form-checkbox-block';

export default Ember.Component.extend({
  layout,
  classNames: ['checkbox-list'],
  displayProperty: 'id',
  currentModels: [],
  required: false,

  hasError: Ember.computed('required', 'checkedItems', function() {
    if (this.get('required')) {
      let checked = this.get('checkedItems').length;
      if ( checked <= 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }),

  // Create a proxy list of the model objects, adding a 'checked' boolean to the object.
  proxiedModels: Ember.computed.map('model', function(model) {
    let ids = Ember.A();
    if (this.get('currentModels')) {
      ids = this.get('currentModels').mapBy('id');
    }
    return Ember.ObjectProxy.create({
      content: model,
      checked: ids.contains(model.id)
    });
  }),

  // A list of the proxied models that have been checked.
  proxiedCheckedItems: Ember.computed.filterBy('proxiedModels', 'checked', true),

  // Map back out the content property of each ObjectProperty to return 
  // the ember-data object initially passed
  checkedItems: Ember.computed.mapBy('proxiedCheckedItems', 'content'),

  updatedObserver: Ember.observer('proxiedModels.@each.checked', 'model', function() {
    if (this.attrs.hasOwnProperty('onCheckUpdate')) {
      this.attrs.onCheckUpdate(this.get('checkedItems'));
    }
  }),

  allChecked: Ember.computed('checkedItems', function() {
    let checked = this.get('checkedItems').length;
    let all = this.get('proxiedModels').length;
    return (checked === all) ? true : false;
  }),

  actions: {
    toggleAll: function() {
      let checked = this.get('checkedItems').length;
      let all = this.get('proxiedModels').length;
      if ( checked === 0 || checked < all) {
        this.get('proxiedModels').setEach('checked', true);
      } else {
        this.get('proxiedModels').setEach('checked', false);
      }
    }
  }
});
