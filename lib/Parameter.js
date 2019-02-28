const AnnotatedObject = require('./AnnotatedObject');

class Parameter extends AnnotatedObject {
  constructor() {
    super();
    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
    this.addAttributeHandler('Nullable', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('MaxLength', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Precision', this.addIntAttributeToObj, {});
    this.addAttributeHandler('Scale', this.addAttributeToObj, {});
    this.addAttributeHandler('Unicode', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('SRID', this.addAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
