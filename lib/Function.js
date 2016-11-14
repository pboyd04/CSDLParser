const assert = require('assert');

function Function(metadata, xml) {
  this._metadata = metadata;
  this.parseBooleanAttribute(xml, 'IsBound');
  this.parseBooleanAttribute(xml, 'IsComposable');
  return this;
}

Function.prototype.parseBooleanAttribute = function(xml, name) {
  var attr = xml.attr(name);
  if(attr === null) {
    return;
  }
  var value = attr.value();
  if(value === 'true') {
    this[name] = true;
  }
  else if(value === 'false') {
    this[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
