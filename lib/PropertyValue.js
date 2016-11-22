const ParserCommon = require('./ParserCommon');

function PropertyValue(xml) {
  this.Annotations = {};

  this.validElements = {
  };
  this.validAttributes = {
    'Bool': {bool: true},
    'String': {},
    'Path': {},
    'Property': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'PropertyValue', 'Property');

  return this;
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
