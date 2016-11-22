const ParserCommon = require('./ParserCommon');

function Property(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'Type': {},
    'Nullable': {bool: true},
    'MaxLength': {integer: true},
    'Precision': {integer: true},
    'Scale': {},
    'Unicode': {bool: true},
    'SRID': {},
    'DefaultValue': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Property', 'Name');
}

module.exports = Property;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
