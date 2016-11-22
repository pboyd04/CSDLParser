const ParserCommon = require('./ParserCommon');

function Annotation(xml) {
  this.validElements = {
    'Collection': {parent: this, name: 'Collection'},
    'Record': {parent: this, name: 'Record'},
    'String': {parent: this, name: 'String', getText: true}
  };
  this.validAttributes = {
    'Term': {alreadyHandeled: true},
    'Qualifier': {},
    'String': {},
    'EnumMember': {},
    'Bool': {bool: true},
    'Int': {integer: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Action', 'Term');
  return this;
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
