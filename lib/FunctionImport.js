const AnnotatedObject = require('./AnnotatedObject');

class FunctionImport extends AnnotatedObject {
  constructor() {
    super();

    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('EntitySet', this.addAttributeToObj, {});
    this.addAttributeHandler('Function', this.addAttributeToObj, {});
    this.addAttributeHandler('IncludeInServiceDocument', this.addBoolAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
