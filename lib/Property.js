const ParserCommon = require('./ParserCommon');

class Property extends ParserCommon {
  constructor(element) {
    super();

    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'Type': {},
      'Nullable': {bool: true},
      'MaxLength': {integer: true},
      'Precision': {integer: true},
      'Scale': {},
      'Unicode': {bool: true},
      'SRID': {},
      'DefaultValue': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = Property;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
