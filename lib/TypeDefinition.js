const assert = require('assert');

function TypeDefinition(metadata, xml) {
  this._metadata = metadata;
  this.parseUnderlyingType(xml);
  return this;
}

TypeDefinition.prototype.parseUnderlyingType = function(xml) {
  var attr = xml.attr('UnderlyingType');
  if(attr === null) {
    this.UnderlyingType = 'Edm.Int32';
    return;
  }
  var value = attr.value();
  this.UnderlyingType = value;
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
