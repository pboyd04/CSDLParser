const ParserCommon = require('./ParserCommon');

class PropertyValue extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};
    this.Records = [];

    this.validElements = {
      'Record': {parent: this.Records},
      'Collection': {parent: this, name: 'Collection'}
    };
    this.validAttributes = {
      'Bool': {bool: true},
      'String': {},
      'Path': {},
      'Property': {alreadyHandeled: true},
      'EnumMember': {}
    };
    this.init(element, 'Property');
  }
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
