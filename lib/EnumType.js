const assert = require('assert');

function EnumType(metadata, xml) {
  this._metadata = metadata;
  var members = xml.find('.//*[local-name()="Member"]');
  for(var i = 0; i < members.length; i++)
  {
    var name = members[i].attr('Name').value();
    var value = members[i].attr('Value');
    if(value === null)
    {
      this[name] = i;
    }
    else
    {
      this[name] = value.value()*1;
    }
  }
  this.parseBooleanAttribute(xml, 'IsFlags');
  this.parseUnderlyingType(xml);
  return this;
}

EnumType.prototype.parseBooleanAttribute = function(xml, name) {
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

EnumType.prototype.parseUnderlyingType = function(xml) {
  var attr = xml.attr('UnderlyingType');
  if(attr === null) {
    this.UnderlyingType = 'Edm.Int32';
    return;
  }
  var value = attr.value();
  this.UnderlyingType = value;
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
