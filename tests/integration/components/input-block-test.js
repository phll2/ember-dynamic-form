import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-block', 'Integration | Component | input block', {
  integration: true
});

test('type can be specified', function(assert) {
  assert.expect(1);
  this.set('type', 'password');
  this.render(hbs`{{input-block type=type}}`);
  assert.equal(this.$('input').prop('type'), 'password', 'input type has defaulted to text');
});

test('type defaults to text if not specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.equal(this.$('input').prop('type'), 'text', 'input type has defaulted to text');
});

test('value is accepted', function(assert) {
  assert.expect(1);
  this.set('value', 'dummyValue'); 
  this.render(hbs`{{input-block value=value}}`);
  assert.equal(this.$('input').val(), 'dummyValue', 'input has correct text');
});

test('if label is not specified, a prompt to provide one is used instead', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.equal(this.$('label').text().trim(), 'You need to provide a label for this input');
});

test('label is accepted', function(assert) {
  assert.expect(1);
  this.set('label', 'some label');
  this.render(hbs`{{input-block label=label}}`);
  assert.equal(this.$('label').text().trim(), 'some label');
});

test('inputId can be specified', function(assert) {
  assert.expect(2);
  let inputId = 'someId';
  this.set('inputId', inputId);
  this.render(hbs`{{input-block inputId=inputId}}`);
  assert.equal(this.$('label').prop('for'), inputId, 'label for has been set to label value');
  assert.equal(this.$('input').prop('id'), inputId, 'inputId has been set to label value');
});

test('if inputId not specified, a lowercased, de-spaced, random numbered version of the label value is used', function(assert) {
  assert.expect(1);
  let label = 'TEST Name';
  let convertedLabel = label.toLowerCase().replace(/ /g, '');
  let rx = new RegExp(convertedLabel+"[0-9]{1,3}");

  this.set('label', label);
  this.render(hbs`{{input-block label=label}}`);
  let prop = this.$('label').prop('for');
  assert.ok(rx.exec(prop), 'label has been used in the absence of in inputId');
});

test('font awesome icon can be set', function(assert) {
  assert.expect(1);
  this.set('icon', 'fa-building');
  this.render(hbs`{{input-block icon=icon}}`);
  assert.ok(this.$('span[class=input-group-addon] i').hasClass('fa-building'), 'icon id has been added');
});

test('if icon is not specified, the input does not show the icon span element', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.equal(this.$('span[class=input-group-addon]').length, 0);
});

test('if iconRight is not true, the icon is rendered on the left side of the input', function(assert) {
  assert.expect(2);
  this.set('icon', 'some icon');
  this.render(hbs`{{input-block icon=icon}}`);
  assert.ok(this.$('input').prev().hasClass('input-group-addon'));
  assert.notOk(this.$('input').next().hasClass('input-group-addon'));
});

test('if iconRight is true, the icon is rendered on the right side of the input', function(assert) {
  assert.expect(2);
  this.set('icon', 'some icon');
  this.render(hbs`{{input-block icon=icon iconRight=true}}`);
  assert.notOk(this.$('input').prev().hasClass('input-group-addon'));
  assert.ok(this.$('input').next().hasClass('input-group-addon'));
});

test('required attribute is not present by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.notOk(this.$('input').is('[required]'), 'input does not contain the required attribute by default');
});

test('required can be set', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block required=true}}`);
  assert.ok(this.$('input').attr('required'), 'input contains the required attribute');
});

test('placeholder attribute is not present by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.notOk(this.$('input').is('[placeholder]'), 'input does not contain the placeholder attribute by default');
});

test('placeholder can be set', function(assert) {
  assert.expect(1);
  let placeholder = 'some placeholder';
  this.set('placeholder', placeholder);
  this.render(hbs`{{input-block placeholder=placeholder}}`);
  assert.equal(this.$('input').attr('placeholder'), placeholder, 'label for has been set to label value');
});

test('pattern attribute is not present by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{input-block}}`);
  assert.notOk(this.$('input').is('[pattern]'), 'input does not contain the pattern attribute by default');
});

test('pattern can be set', function(assert) {
  assert.expect(1);
  let pattern = 'some pattern';
  this.set('pattern', pattern);
  this.render(hbs`{{input-block pattern=pattern}}`);
  assert.equal(this.$('input').attr('pattern'), pattern, 'label for has been set to label value');
});

test('the onValueUpdate action sends the value up to the bound action', function(assert) {
  assert.expect(2);
  this.on('mockOnValueUpdate', function(value) {
    assert.equal(this.$('input').val(), 'some input', 'input has correct text');
    assert.equal(value, 'some input', 'property has been updated');
  });
  this.render(hbs`{{input-block onValueUpdate=(action "mockOnValueUpdate")}}`);
  this.$('input').val('some input').change();
});
