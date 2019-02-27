const ParserCommon = require('./ParserCommon');

class Singleton extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
    };
    this.validAttributes = {
      'Type': {},
      'Name': {alreadyHandeled: true}
    };
    this.init(element, 'Name');
  }
}

module.exports = Singleton;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
