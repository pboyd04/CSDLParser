const ParserCommon = require('./ParserCommon');

class EntityContainer extends ParserCommon {
  constructor(element) {
    super();

    this.validElements = {
      'EntitySet': {parent: this, nameProp: 'Name'},
      'Singleton': {parent: this, nameProp: 'Name'},
      'ActionImport': {parent: this, nameProp: 'Name'},
      'FunctionImport': {parent: this, nameProp: 'Name'}
    };
    this.validAttributes = {
      'Extends': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
