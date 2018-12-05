const ParserCommon = require('./ParserCommon');

function PropertyValue(xml) {
  this.Annotations = {};
  this.Records = [];

  this.validElements = {
    'Record': {parent: this.Records}
  };
  this.validAttributes = {
    'Bool': {bool: true},
    'String': {},
    'Path': {},
    'Property': {alreadyHandeled: true},
    'EnumMember': {}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'PropertyValue', 'Property');

  return this;
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
