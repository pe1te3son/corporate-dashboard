import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('line-histogram', 'Integration | Component | line histogram', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{line-histogram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#line-histogram}}
      template block text
    {{/line-histogram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
