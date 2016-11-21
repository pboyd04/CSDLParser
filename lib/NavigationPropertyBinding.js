const ParserCommon = require('./ParserCommon');

function NavigationPropertyBinding(xml) {
  this.validElements = {
  };
  this.validAttributes = {
    'Target': {},
    'Path': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'NavigationPropertyBinding', 'Path');
  return this;
}

module.exports = NavigationPropertyBinding;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
