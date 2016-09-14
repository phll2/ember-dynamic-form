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
    if (this.attrs.onRender) {
      this.attrs.onRender();
    }
  },


  didInsertElement() {
    this._super(...arguments);
    if (document.getElementsByClassName('dropzone').length > 0) {
      this.set('dropzone', Dropzone.forElement('#fileUpload'));
    }
  },

  actions: {
    save() {
      let dropzone = this.get('dropzone');
      if (dropzone && dropzone.files.length) {
        dropzone.processQueue();
      } else {
        this.attrs.saveWithoutFiles();
      }
    }
  }
});
