const AnnotatedObject = require('./AnnotatedObject');

class PropertyValue extends AnnotatedObject {
  constructor() {
    super();
    this.Records = [];

    this.addElementHandler('Record', this.addElementToArray, {parent: this.Records});
    this.addElementHandler('Collection', this.addElementToObj, {name: 'Collection'});

    this.addAttributeHandler('Property', null, {});
    this.addAttributeHandler('Path', this.addAttributeToObj, {});
    this.addAttributeHandler('String', this.addAttributeToObj, {});
    this.addAttributeHandler('EnumMember', this.addAttributeToObj, {});
    this.addAttributeHandler('Bool', this.addBoolAttributeToObj, {});
    this.nameAttr = 'Property';
  }
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
