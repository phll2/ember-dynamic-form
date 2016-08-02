import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let companies = [];
    for (let i = 0; i < 5; i++) {
      companies.push(Ember.Object.create({
        id: i, 
        name: 'company' + i, 
        address: 'address' + i 
      }));
    }

    return Ember.RSVP.hash({
      user: Ember.Object.create(),
      companies: companies
    });
  },

  setupController(controller, models) {
    controller.set('model', models.user);
    controller.set('companies', models.companies);
  },
});
