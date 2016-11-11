const assert = require('assert');

const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function ComplexType(metadata, xml) {
  this._metadata = metadata;
  var properties = xml.find('.//*[local-name()="Property"]');
  var navProperties = xml.find('.//*[local-name()="NavigationProperty"]');
  for(var i = 0; i < properties.length; i++)
  {
    var name = properties[i].attr('Name').value();
    this[name] = new Property(this, properties[i]);
  }
  for(var i = 0; i < navProperties.length; i++)
  {
    var name = navProperties[i].attr('Name').value();
    this[name] = new NavigationProperty(this, navProperties[i]);
  }
  this.parseBooleanAttribute(xml, 'Abstract');
  this.parseBooleanAttribute(xml, 'OpenType');
  this.parseBaseType(xml);
  return this;
}

ComplexType.prototype.parseBooleanAttribute = function(xml, name) {
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

ComplexType.prototype.parseBaseType = function(xml) {
  var attr = xml.attr('BaseType');
  if(attr === null) {
    return;
  }
  var value = attr.value();
  this.BaseType = this._metadata.getTypeByName(value);
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
