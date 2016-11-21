const ParserCommon = require('./ParserCommon');

function Action(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Action', 'Name');

  return this;
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
