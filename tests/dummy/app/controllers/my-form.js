import Ember from 'ember';

export default Ember.Controller.extend({
  companySelectOptions: Ember.computed.map('companies', function(company) {
    return Ember.ObjectProxy.create({
      value: company.get('id'),
      label: company.get('name')
    });
  }),

  actions: {
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
    save() {
      let user = this.get('model');
      console.log(user);
    }
  }
});
