const ParserCommon = require('./ParserCommon');

class Action extends ParserCommon {
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
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
