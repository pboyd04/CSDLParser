const ParserCommon = require('./ParserCommon');

function Function(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Function', 'Name');
  return this;
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
