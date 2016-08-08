import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('label-element', 'Integration | Component | label element', {
  integration: true
});

test('asterisk is shown if required is set to true', function(assert) {
  assert.expect(1);
  this.render(hbs`{{label-element required=true}}`);
  assert.equal(this.$('span[class=required-asterisk]').length, 1);
});

test('asterisk is not shown if required is not set', function(assert) {
  assert.expect(1);
  this.render(hbs`{{label-element}}`);
  assert.equal(this.$('span[class=required-asterisk]').length, 0);
});

test('for id is correctly set', function(assert) {
  assert.expect(1);
  let forId = 'someId';
  this.set('forId', forId);
  this.render(hbs`{{label-element for=forId}}`);
  assert.equal(this.$('label').attr('for'), forId, 'for id for has been set to forId value');
});

test('label can be set', function(assert) {
  assert.expect(1);
  let label = 'some label';
  this.set('label', label);
  this.render(hbs`{{label-element label=label}}`);
  assert.equal(this.$('label').text().trim(), label, 'label has correct text');
});
