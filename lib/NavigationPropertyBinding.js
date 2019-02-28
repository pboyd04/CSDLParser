const ParserCommon = require('./ParserCommon');

class NavigationPropertyBinding extends ParserCommon {
  constructor() {
    super();
    this.addAttributeHandler('Target', this.addAttributeToObj, {});
    this.addAttributeHandler('Path', null, {});
    this.nameAttr = 'Path';
  }
}

module.exports = NavigationPropertyBinding;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
