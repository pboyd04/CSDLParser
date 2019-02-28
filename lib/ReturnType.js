const ParserCommon = require('./ParserCommon');


class ReturnType extends ParserCommon {
  constructor() {
    super();

    this.addAttributeHandler('Nullable', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});
  }
}

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
