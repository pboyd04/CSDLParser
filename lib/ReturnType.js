const assert = require('assert');

function ReturnType(xml) {
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i]);
    }
    else
    {
      throw new Error('Unknown element type in ReturnType!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i]);
  } 
  return this;
}

ReturnType.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

ReturnType.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in ReturnType');
      break;
  }
}

ReturnType.prototype.parseBooleanAttribute = function(attr, name) {
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

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
