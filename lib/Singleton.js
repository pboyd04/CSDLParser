const AnnotatedObject = require('./AnnotatedObject');

class Singleton extends AnnotatedObject {
  constructor() {
    super();
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});
    this.nameAttr = 'Name';
  }
}

module.exports = Singleton;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
