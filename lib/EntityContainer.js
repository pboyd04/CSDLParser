const ParserCommon = require('./ParserCommon');

function EntityContainer(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'EntityContainer', 'Name');
  return this;
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
