const ParserCommon = require('./ParserCommon');


class Parameter extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'Name': {alreadyHandeled: true},
      'Type': {},
      'Nullable': {bool: true},
      'MaxLength': {integer: true},
      'Precision': {integer: true},
      'Scale': {},
      'Unicode': {bool: true},
      'SRID': {}
    };

    this.init(element, 'Name');
  }
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
