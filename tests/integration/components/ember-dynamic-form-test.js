import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-dynamic-form', 'Integration | Component | ember dynamic form', {
  integration: true
});

test('title is accepted', function(assert) {
  assert.expect(1);
  this.set('title', 'dummyValue'); 
  this.render(hbs`{{ember-dynamic-form title=title}}`);
  assert.equal(this.$('h2').text().trim(), 'dummyValue', 'title has correct text');
});

test('if title is specified, the h2 element is rendered', function(assert) {
  assert.expect(1);
  this.set('title', 'dummyValue'); 
  this.render(hbs`{{ember-dynamic-form title=title}}`);
  assert.equal(this.$('h2').length, 1, 'h2 element is rendered');
});

test('if title is not specified, the h2 element is not rendered', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form}}`);
  assert.equal(this.$('h2').length, 0, 'h2 element is not rendered');
});

test('if hasRequired is set, a note is added to the end of the form', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form hasRequired=true}}`);
  assert.equal(this.$('span[class=required-asterisk]').length, 1);
});

test('if hasRequired is not set, a note is not added to the end of the form', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ember-dynamic-form}}`);
  assert.equal(this.$('span[class=required-asterisk]').length, 0);
});
