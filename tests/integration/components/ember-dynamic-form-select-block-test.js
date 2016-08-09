import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form-select-block', 'Integration | Component | ember dynamic form select block', {
  integration: true
});

test('if label is not specified, a prompt to provide one is used instead', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-select-block}}`);
  assert.equal(this.$('label').text().trim(), 'You need to provide a label for this select');
});

test('label is accepted', function(assert) {
  assert.expect(1);
  this.set('label', 'some label');
  this.render(hbs`{{ember-dynamic-form-select-block label=label}}`);
  assert.equal(this.$('label').text().trim(), 'some label');
});

test('selectId can be specified', function(assert) {
  assert.expect(2);
  let selectId = 'someId';
  this.set('selectId', selectId);
  this.render(hbs`{{ember-dynamic-form-select-block selectId=selectId}}`);
  assert.equal(this.$('label').prop('for'), selectId, 'label for has been set to label value');
  assert.equal(this.$('select').prop('id'), selectId, 'selectId has been set to label value');
});

test('if selectId not specified, a lowercased, de-spaced, random numbered version of the label value is used', function(assert) {
  assert.expect(1);
  let label = 'TEST Name';
  let convertedLabel = label.toLowerCase().replace(/ /g, '');
  let rx = new RegExp(convertedLabel+"[0-9]{1,3}");

  this.set('label', label);
  this.render(hbs`{{ember-dynamic-form-select-block label=label}}`);
  let prop = this.$('label').prop('for');
  assert.ok(rx.exec(prop), 'label has been used in the absence of in selectId');
});

test('font awesome icon can be set', function(assert) {
  assert.expect(1);
  this.set('icon', 'fa-building');
  this.render(hbs`{{ember-dynamic-form-select-block icon=icon}}`);
  assert.ok(this.$('span[class=input-group-addon] i').hasClass('fa-building'), 'icon id has been added');
});

test('if icon is not specified, the select does not show the icon span element', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-select-block}}`);
  assert.equal(this.$('span[class=input-group-addon]').length, 0);
});

test('if iconRight is not true, the icon is rendered on the left side of the select', function(assert) {
  assert.expect(2);
  this.set('icon', 'some icon');
  this.render(hbs`{{ember-dynamic-form-select-block icon=icon}}`);
  assert.ok(this.$('select').prev().hasClass('input-group-addon'));
  assert.notOk(this.$('select').next().hasClass('input-group-addon'));
});

test('if iconRight is true, the icon is rendered on the right side of the select', function(assert) {
  assert.expect(2);
  this.set('icon', 'some icon');
  this.render(hbs`{{ember-dynamic-form-select-block icon=icon iconRight=true}}`);
  assert.notOk(this.$('select').prev().hasClass('input-group-addon'));
  assert.ok(this.$('select').next().hasClass('input-group-addon'));
});

test('required attribute is not present by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-select-block}}`);
  assert.notOk(this.$('select').is('[required]'), 'select does not contain the required attribute');
});

test('required can be set', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-select-block required=true}}`);
  assert.ok(this.$('select').attr('required'), 'select contains the required attribute');
});

test('the select placeholder option renders as \'Select\' by default', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form-select-block}}`);
  assert.equal(this.$('select').find('option:eq(0)').text().trim(), 'Select', 'select placeholder option renders as \'Select\'');
});

test('placeholder can be set', function(assert) {
  assert.expect(1);
  let placeholder = 'some placeholder';
  this.set('placeholder', placeholder);
  this.render(hbs`{{ember-dynamic-form-select-block placeholder=placeholder}}`);
  assert.equal(this.$('select').find('option:eq(0)').text().trim(), placeholder, 'select placeholder option renders as \'Select\'');
});

test('select options array is accepted', function(assert) {
  assert.expect(2);
  let options = [ { value:"1", label:"some value" } ];
  this.set('options', options);
  this.render(hbs`{{ember-dynamic-form-select-block options=options}}`);
  assert.equal(this.$('select').find('option:eq(1)').attr('value'), options[0].value, 'the options value is correctly taken');
  assert.equal(this.$('select').find('option:eq(1)').text().trim(), options[0].label, 'the options label is correctly taken');
});

//test('if there is a selected value passed in, the relevant select option is set as selected', function(assert) {
  //assert.expect(1);
  //let options = [ 
    //{ value:"1", label:"some value" },
    //{ value:"2", label:"some other value" }
  //];
  //let selected = options[1].value;
  //this.set('options', options);
  //this.set('selected', selected);
  //this.render(hbs`{{ember-dynamic-form-select-block options=options selected=selected}}`);
  //assert.equal(this.$('select').find('option:eq(2)').attr('selected'), true, 'the selected attribute of the relevant option is true');
//});

test('the onOptionSelect action sends the value up to the bound action', function(assert) {
  assert.expect(1);
  this.on('mockOnOptionSelect', function(value) {
    assert.equal(value, options[0].value, 'value has been passed to the bound action');
  });

  let options = [ { value:"someId", label:"some value" } ];
  this.set('options', options);
  this.render(hbs`{{ember-dynamic-form-select-block options=options onOptionSelect=(action "mockOnOptionSelect")}}`);
  this.$('select').find('option[value="' + options[0].value + '"]').trigger('change');
});

test('if the value of a select which has required=true is set to non-blank, the has-success class is added', function(assert) {
  assert.expect(2);
  this.on('mockOnOptionSelect', function(value) {
    this.set('selected', value); 
    assert.equal(this.$('div[class*=has-success]').length, 1, 'has-success class has been added');
  });
  let options = [ { value:"1", label:"some value" } ];
  this.set('options', options);
  this.set('selected', undefined);
  this.render(hbs`{{ember-dynamic-form-select-block required=true options=options selected=selected onOptionSelect=(action "mockOnOptionSelect")}}`);
  assert.equal(this.$('div[class*=has-success]').length, 0, 'there is no element with the has-success class');
  this.$('select').val('1').change(); 
});
