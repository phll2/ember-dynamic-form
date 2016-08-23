import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form';

//component options
/*
 *title
 *hasRequired
 */

export default Ember.Component.extend({
  layout,
  classNames: ['dynamic-form'],
  dropzone: null,

  didReceiveAttrs() {
    this.attrs.onRender();
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('dropzone', Dropzone.forElement('#fileUpload'));
  },

  actions: {
    save() {
      let dropzone = this.get('dropzone');
      if (dropzone.files.length) {
        dropzone.processQueue();
      } else {
        this.attrs.saveWithoutFiles();
      }
    }
  }
});
