const ParserCommon = require('./ParserCommon');

class Function extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};
    this.Parameters = {};
    this.ReturnType = null;

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'Parameter': {parent: this.Parameters, nameProp: 'Name'},
      'ReturnType': {name: 'ReturnType'}
    };
    this.validAttributes = {
      'IsBound': {bool: true},
      'IsComposable': {bool: true},
      'EntitySetPath': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
