const ParserCommon = require('./ParserCommon');

class Record extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};
    this.PropertyValues = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'PropertyValue': {parent: this.PropertyValues, nameProp: 'Property'}
    };
    this.validAttributes = {
      'Type': {}
    };
    this.init(element);
  }
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
