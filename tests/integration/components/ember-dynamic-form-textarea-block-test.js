import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form-textarea-block', 'Integration | Component | ember dynamic form textarea block', {
  integration: true
});

test('value is accepted', function(assert) {
  assert.expect(1);
  this.set('value', 'dummyValue'); 
  this.render(hbs`{{ember-dynamic-form-textarea-block value=value}}`);
  assert.equal(this.$('textarea').val(), 'dummyValue', 'textarea has correct text');
});

test('if label is not specified, a prompt to provide one is used instead', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-textarea-block}}`);
  assert.equal(this.$('label').text().trim(), 'You need to provide a label for this textarea');
});

test('label is accepted', function(assert) {
  assert.expect(1);
  this.set('label', 'some label');
  this.render(hbs`{{ember-dynamic-form-textarea-block label=label}}`);
  assert.equal(this.$('label').text().trim(), 'some label');
});

test('cols can be specified', function(assert) {
  assert.expect(1);
  let cols = 20;
  this.set('cols', cols);
  this.render(hbs`{{ember-dynamic-form-textarea-block cols=cols}}`);
  assert.equal(this.$('textarea').prop('cols'), cols, 'cols has correct value');
});

test('rows can be specified', function(assert) {
  assert.expect(1);
  let rows = 2;
  this.set('rows', rows);
  this.render(hbs`{{ember-dynamic-form-textarea-block rows=rows}}`);
  assert.equal(this.$('textarea').prop('rows'), rows, 'rows has correct value');
});

test('textareaId can be specified', function(assert) {
  assert.expect(2);
  let textareaId = 'someId';
  this.set('textareaId', textareaId);
  this.render(hbs`{{ember-dynamic-form-textarea-block textareaId=textareaId}}`);
  assert.equal(this.$('label').prop('for'), textareaId, 'label for has been set to label value');
  assert.equal(this.$('textarea').prop('id'), textareaId, 'textareaId has been set to label value');
});

test('if textareaId not specified, a lowercased, de-spaced, random numbered version of the label value is used', function(assert) {
  assert.expect(1);
  let label = 'TEST Name';
  let convertedLabel = label.toLowerCase().replace(/ /g, '');
  let rx = new RegExp(convertedLabel+"[0-9]{1,3}");

  this.set('label', label);
  this.render(hbs`{{ember-dynamic-form-textarea-block label=label}}`);
  let prop = this.$('label').prop('for');
  assert.ok(rx.exec(prop), 'label has been used in the absence of in textareaId');
});

test('required attribute is not present by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-textarea-block}}`);
  assert.notOk(this.$('textarea').is('[required]'), 'textarea does not contain the required attribute by default');
});

test('required can be set', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-textarea-block required=true}}`);
  assert.ok(this.$('textarea').attr('required'), 'textarea contains the required attribute');
});

test('the onValueUpdate action sends the value up to the bound action', function(assert) {
  assert.expect(2);
  this.on('mockOnValueUpdate', function(value) {
    assert.equal(this.$('textarea').val(), 'some input', 'textarea has correct text');
    assert.equal(value, 'some input', 'property has been updated');
  });
  this.render(hbs`{{ember-dynamic-form-textarea-block onValueUpdate=(action "mockOnValueUpdate")}}`);
  this.$('textarea').val('some input').change();
});

test('if the value of a textarea which has required=true is changed to non-blank, the has-success class is added', function(assert) {
  assert.expect(2);
  this.on('mockOnValueUpdate', function() {});
  this.render(hbs`{{ember-dynamic-form-textarea-block required=true onValueUpdate=(action "mockOnValueUpdate")}}`);
  assert.equal(this.$('div[class*=has-success]').length, 0, 'there is no element with the has-success class');
  this.$('textarea').val('some value').change();
  assert.equal(this.$('div[class*=has-success]').length, 1, 'has-success class has been added');
});

