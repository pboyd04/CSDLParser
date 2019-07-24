const ParserCommon = require('./ParserCommon');

class Collection extends ParserCommon {
  constructor(element) {
    super();
    this.PropertyPaths = [];
    this.Records = [];
    this.Strings = [];

    this.validElements = {
      'PropertyPath': {parent: this.PropertyPaths, getText: true},
      'Record': {parent: this.Records},
      'String': {parent: this.Strings, getText: true}
    };

    this.init(element);

    if(this.PropertyPaths.length === 0) {
      delete this.PropertyPaths;
    }
    if(this.Records.length === 0) {
      delete this.Records;
    }
  }
}

module.exports = Collection;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
