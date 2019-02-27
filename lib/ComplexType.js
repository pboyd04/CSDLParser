const ParserCommon = require('./ParserCommon');

class ComplexType extends ParserCommon {
  constructor(element) {
    super();

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

    this.init(element, 'Name');
  }
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
