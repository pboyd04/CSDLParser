const ParserCommon = require('./ParserCommon');

function TypeDefinition(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'UnderlyingType': {},
    'Name': {alreadyHandeled: true},
    'MaxLength': {integer: true},
    'Precision': {integer: true},
    'Scale': {},
    'Unicode': {bool: true},
    'SRID': {}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'TypeDefinition', 'Name');
  return this;
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
