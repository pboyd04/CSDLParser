const AnnotatedObject = require('./AnnotatedObject');

class ActionImport extends AnnotatedObject {
  constructor() {
    super();
    this.addAttributeHandler('Action', this.addAttributeToObj, {});
    this.addAttributeHandler('EntitySet', this.addAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});

    this.nameAttr = 'Name';
  }
}

module.exports = ActionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
