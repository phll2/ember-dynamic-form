import Ember from 'ember';
import layout from '../templates/components/ember-dynamic-form';

export default Ember.Component.extend({
  layout,
  classNames: ['dynamic-form'],

  actions: {
    //completeMultipleEvent(files) {
      //this.attrs.saveWithFiles(files);
    //},
    save() {
      //let dropzone = this.get('dropzone');
      //if (dropzone.files.length) {
        //dropzone.processQueue();
      //} else {
        this.attrs.saveWithoutFiles();
      //}
    }
  }
});
