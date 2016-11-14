const assert = require('assert');

function Function(metadata, xml) {
  this._metadata = metadata;
  var returnTypes = xml.find('.//*[local-name()="ReturnType"]');
  assert(returnTypes.length === 1);
  this.ReturnType = returnTypes[0].attr('Type').value();
  this.Parameters = {};
  var parameters = xml.find('.//*[local-name()="Parameter"]');
  for(var i = 0; i < parameters.length; i++)
  {
    var name = parameters[i].attr('Name').value();
    var type = parameters[i].attr('Type').value();
    this.Parameters[name] = type;
  }
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
