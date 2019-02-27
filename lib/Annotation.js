const ParserCommon = require('./ParserCommon');

class Annotation extends ParserCommon {
  constructor(element) {
    super();
    this.validElements = {
      'Collection': {parent: this, name: 'Collection'},
      'Record': {parent: this, name: 'Record'},
      'String': {parent: this, name: 'String', getText: true}
    };
    this.validAttributes = {
      'Term': {alreadyHandeled: true},
      'Qualifier': {},
      'String': {},
      'EnumMember': {},
      'Bool': {bool: true},
      'Int': {integer: true}
    };
    this.init(element, 'Term');
  }
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
