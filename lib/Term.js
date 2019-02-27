const ParserCommon = require('./ParserCommon');

class Term extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'Name': {alreadyHandeled: true},
      'Type': {},
      'BaseTerm': {},
      'DefaultValue': {},
      'AppliesTo': {helperFunc: this.splitAppliesTo.bind(this)},
      'Nullable': {bool: true},
      'MaxLength': {integer: true},
      'Precision': {integer: true},
      'Scale': {},
      'SRID': {}
    };
    this.init(element, 'Name');
  }

  splitAppliesTo(value) {
    return value.split(' ');
  }
}

module.exports = Term;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
