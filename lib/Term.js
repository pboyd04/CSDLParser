const AnnotatedObject = require('./AnnotatedObject');

class Term extends AnnotatedObject {
  constructor() {
    super();
    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
    this.addAttributeHandler('BaseTerm', this.addAttributeToObj, {});
    this.addAttributeHandler('Nullable', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('MaxLength', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Precision', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Scale', this.addAttributeToObj, {});
    this.addAttributeHandler('SRID', this.addAttributeToObj, {});
    this.addAttributeHandler('DefaultValue', this.addAttributeToObj, {});
    this.addAttributeHandler('AppliesTo', this.addAppliesTo, {});
    this.nameAttr = 'Name';
  }

  addAppliesTo(name, value, data) {
    this.addAttributeToObj(name, value.split(' '), data);
  }
}

module.exports = Term;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
