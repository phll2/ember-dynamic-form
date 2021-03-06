import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form-checkbox-block', 'Integration | Component | ember dynamic form checkbox block', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-dynamic-form-checkbox-block}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-dynamic-form-checkbox-block}}
      template block text
    {{/ember-dynamic-form-checkbox-block}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
