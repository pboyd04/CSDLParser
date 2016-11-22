const ParserCommon = require('./ParserCommon');

function Parameter(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'Name': {alreadyHandeled: true},
    'Type': {},
    'Nullable': {bool: true},
    'MaxLength': {integer: true},
    'Precision': {integer: true},
    'Scale': {},
    'Unicode': {bool: true},
    'SRID': {}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Parameter', 'Name');
  return this;
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
