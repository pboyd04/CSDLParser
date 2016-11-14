const assert = require('assert');

function EnumType(metadata, xml) {
  this._metadata = metadata;
  this._index = 0;
  this.Members = {};
  var name = xml.attr('Name').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i], name);
    }
    else
    {
      throw new Error('Unknown element type in EnumType '+name+'!');
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
    default:
      throw new Error('Unknown attribute name '+attrName+' in EnumType '+entityName);
      break;
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
