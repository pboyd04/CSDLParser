const ParserCommon = require('./ParserCommon');

class FunctionImport extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'IncludeInServiceDocument': {bool: true},
      'EntitySet': {},
      'Function': {},
      'Name': {alreadyHandeled: true}
    };
    this.init(element, 'Name');
  }
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
