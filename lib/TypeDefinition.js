const AnnotatedObject = require('./AnnotatedObject');

class TypeDefinition extends AnnotatedObject {
  constructor() {
    super();
    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('UnderlyingType', this.addAttributeToObj, {});
    this.addAttributeHandler('MaxLength', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Precision', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Scale', this.addAttributeToObj, {});
    this.addAttributeHandler('Unicode', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('SRID', this.addAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
