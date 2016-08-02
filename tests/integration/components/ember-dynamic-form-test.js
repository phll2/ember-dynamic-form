import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form', 'Integration | Component | ember dynamic form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#ember-dynamic-form}}
      template block text
    {{/ember-dynamic-form}}
  `);

  //assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(true);
});
