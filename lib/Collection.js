const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const Record = require('./Record');

function Collection(xml) {
  var parseElement = this.parseElement.bind(this);
  ParserCommon.parseEntity(xml, 'Collection', parseElement);
  return this;
}

Collection.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'PropertyPath':
      if(this.PropertyPaths === undefined) {
        this.PropertyPaths = [];
      }
      this.PropertyPaths.push(element.text());
      break;
    case 'Record':
      if(this.Records === undefined) {
        this.Records = [];
      }
      this.Records.push(new Record(element));
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

module.exports = Collection;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
