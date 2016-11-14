const assert = require('assert');

function Collection(xml) {
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
      throw new Error('Unknown element type in Collection!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i]);
  }
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
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Collection.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    default:
      throw new Error('Unknown attribute name '+attrName+' in Collection');
      break;
  }
}

module.exports = Collection;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
