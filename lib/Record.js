const AnnotatedObject = require('./AnnotatedObject');

class Record extends AnnotatedObject {
  constructor() {
    super();
    this.PropertyValues = {};

    this.addElementHandler('PropertyValue', this.addElementToObj, {parent: this.PropertyValues, nameProp: 'Property'});
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
  }
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
