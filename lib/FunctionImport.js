const ParserCommon = require('./ParserCommon');

function FunctionImport(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'EntitySet': {},
    'Function': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'FunctionImport', 'Name');
  return this;
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
