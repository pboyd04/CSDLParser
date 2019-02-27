'use strict'
const ParserCommon = require('./ParserCommon');

class Schema extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = { 
      'Action': {parent: this, nameProp: 'Name'},
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'ComplexType': {parent: this, nameProp: 'Name'},
      'EntityContainer': {parent: this, nameProp: 'Name'},
      'EntityType': {parent: this, nameProp: 'Name'},
      'EnumType': {parent: this, nameProp: 'Name'},
      'Function': {parent: this, nameProp: 'Name'},
      'Term': {parent: this, nameProp: 'Name'},
      'TypeDefinition': {parent: this, nameProp: 'Name'}
    };
    this.validAttributes = {
      'Namespace': {alreadyHandeled: true},
      'Alias': {name: '_Alias'},
      'xmlns': {alreadyHandeled: true}
    };

    this.init(element, 'Namespace', '_Name');
  }
}

module.exports = Schema;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
