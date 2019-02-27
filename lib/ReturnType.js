const ParserCommon = require('./ParserCommon');


class ReturnType extends ParserCommon {
  constructor(element) {
    super();

    this.validAttributes = {
      'Nullable': {bool: true},
      'Type': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element);
  }
}

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
