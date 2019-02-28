'use strict'
const AnnotatedObject = require('./AnnotatedObject');

class Schema extends AnnotatedObject {
  constructor() {
    super();

    this.addElementHandler('Action', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('ComplexType', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('EntityContainer', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('EntityType', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('EnumType', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('Function', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('Term', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('TypeDefinition', this.addElementToObj, {nameProp: 'Name'});

    this.addAttributeHandler('Alias', this.addAttributeToObj, {name: '_Alias'});
    this.addAttributeHandler('Namespace', null, {});
    this.addAttributeHandler('xmlns', null, {});
    this.nameAttr = 'Namespace';
    this.nameAttrLocation = '_Name';
  }
}

module.exports = Schema;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
