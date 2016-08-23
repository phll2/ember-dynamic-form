import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create();
  },

  setupController(controller, model) {
    controller.set('model', model);

    let companies = [];
    for (let i = 0; i < 5; i++) {
      companies.push(Ember.Object.create({
        id: i, 
        name: 'company' + i, 
        address: 'address' + i 
      }));
    }
    controller.set('companies', companies);
  },
});
