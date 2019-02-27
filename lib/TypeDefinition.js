const ParserCommon = require('./ParserCommon');

class TypeDefinition extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'UnderlyingType': {},
      'Name': {alreadyHandeled: true},
      'MaxLength': {integer: true},
      'Precision': {integer: true},
      'Scale': {},
      'Unicode': {bool: true},
      'SRID': {}
    };
    this.init(element, 'Name');
  }
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
