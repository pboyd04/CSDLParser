const ParserCommon = require('./ParserCommon');

function ReturnType(xml) {
  this.validElements = {
  };
  this.validAttributes = {
    'Nullable': {bool: true},
    'Type': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'ReturnType');
  return this;
}

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
