import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form-pikaday-input', 'Integration | Component | ember dynamic form pikaday input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-dynamic-form-pikaday-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-dynamic-form-pikaday-input}}
      template block text
    {{/ember-dynamic-form-pikaday-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
