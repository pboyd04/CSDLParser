const AnnotatedObject = require('./AnnotatedObject');

class ComplexType extends AnnotatedObject {
  constructor() {
    super();

    this.Properties = {};

    this.addElementHandler('Property', this.addElementToObj, {parent: this.Properties, nameProp: 'Name'});
    this.addElementHandler('NavigationProperty', this.addElementToObj, {parent: this.Properties, nameProp: 'Name'});

    this.addAttributeHandler('Abstract', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('OpenType', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('BaseType', this.addAttributeToObj, {});

    this.nameAttr = 'Name';
  }
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
