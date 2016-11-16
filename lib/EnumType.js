const assert = require('assert');

function EnumType(xml) {
  this._index = 0;
  this.Members = {};
  var name = xml.attr('Name').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i], name);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in EnumType! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in EnumType '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  delete this._index;
  return this;
}

EnumType.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Member':
      var name = element.attr('Name').value();
      var value = element.attr('Value');
      if(value === null)
      {
        this.Members[name] = this._index++;
      }
      else
      {
        this.Members[name] = value.value()*1;
        this._index = value.value()*1;
      }
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EnumType.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'IsFlags':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EnumType '+entityName);
      break;
  }
}

EnumType.prototype.parseBooleanAttribute = function(xml, name) {
  var value = xml.value();
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

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
