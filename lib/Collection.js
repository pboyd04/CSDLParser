const ParserCommon = require('./ParserCommon');

function Collection(xml) {
  this.PropertyPaths = [];
  this.Records = [];

  this.validElements = {
    'PropertyPath': {parent: this.PropertyPaths, getText: true},
    'Record': {parent: this.Records}
  };
  this.validAttributes = {
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Collection');
 
  if(this.PropertyPaths.length === 0) {
    delete this.PropertyPaths;
  }
  if(this.Records.length === 0) {
    delete this.Records;
  }
  return this;
}

module.exports = Collection;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
