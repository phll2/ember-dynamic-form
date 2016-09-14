import Ember from 'ember';

export default Ember.Controller.extend({
  uploadUrl: `api/uploadFiles`,
  promisesArray : Ember.A(),

  // create array of companies for the select options
  companySelectOptions: Ember.computed.map('companies', function(company) {
    return Ember.ObjectProxy.create({
      value: company.get('id'),
      label: company.get('name')
    });
  }),

  createFile(fileObject) {
    return {
      originalName: fileObject.originalname,
      encoding: fileObject.encoding,
      mimeType: fileObject.mimetype,
      destination: fileObject.destination,
      fileName: fileObject.filename,
      path: fileObject.path,
      size: fileObject.size
    };
  },

  actions: {
    clearPromisesArray() { // remove old files
      this.get('promisesArray').clear();
    },
    setUsername(value) {
      this.get('model').set('username', value);
    },
    setAge(value) {
      this.get('model').set('age', value);
    },
    setDate(value) {
      this.get('model').set('date', value);
    },
    setPassword(value) {
      this.get('model').set('password', value);
    },
    setDescription(value) {
      this.get('model').set('description', value);
    },
    setCompany(id) {
      this.get('model').set('company', id);
    },
    setCompanies(companies) {
      this.get('model').set('companies', companies);
      console.log('companies set: ' + this.get('model').get('companies').length);
    },
    saveWithFiles(response) {
      // each file response in the array contains a full json array of all the 
      // uploaded files, so just take the data from the first file response
      let jsonFileObjects = JSON.parse(response[0].xhr.response);
      jsonFileObjects.forEach(fileObject => {
        let file = this.createFile(fileObject);
        console.log('saved ' + file.originalName);
      });

      Ember.RSVP.all(this.get('promisesArray')).then(files => {
        this.get('model').set('files', files);
        this.send('save');
      }).catch(err => {
        console.log('failed: ' + err);
      });
    },
    save() {
      console.log(this.get('model'));
    }
  }
});
