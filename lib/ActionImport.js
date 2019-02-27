const ParserCommon = require('./ParserCommon');

class ActionImport extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'Action': {},
      'EntitySet': {},
      'Name': {alreadyHandeled: true}
    };
    this.init(element, 'Name');
  }
}

module.exports = ActionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
