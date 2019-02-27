const ParserCommon = require('./ParserCommon');

class NavigationPropertyBinding extends ParserCommon {
  constructor(element) {
    super();
    this.validAttributes = {
      'Target': {},
      'Path': {alreadyHandeled: true}
    };
    this.init(element, 'Path');
  }
}

module.exports = NavigationPropertyBinding;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
