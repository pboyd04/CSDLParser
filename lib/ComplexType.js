const ParserCommon = require('./ParserCommon');

function ComplexType(xml) {
  this.Properties = {};
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'},
    'Property': {parent: this.Properties, nameProp: 'Name'},
    'NavigationProperty': {parent: this.Properties, nameProp: 'Name'}
  };
  this.validAttributes = {
    'Abstract': {bool: true},
    'OpenType': {bool: true},
    'BaseType': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'ComplexType', 'Name');
  return this;
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
