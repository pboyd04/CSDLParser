const ParserCommon = require('./ParserCommon');

class Collection extends ParserCommon {
  constructor() {
    super();
    this.PropertyPaths = [];
    this.Records = [];
    this.Strings = [];

    this.addElementHandler('PropertyPath', this.addStringToArray, {parent: this.PropertyPaths});
    this.addElementHandler('String', this.addStringToArray, {parent: this.Strings});
    this.addElementHandler('Record', this.addElementToArray, {parent: this.Records});
  }

  postInitCleanup() {
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
