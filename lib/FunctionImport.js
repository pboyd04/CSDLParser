const assert = require('assert');
const Annotation = require('./Annotation');

function FunctionImport(xml) {
  this.Annotations = {};
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
      throw new Error('Unknown element type in EntitySet '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

FunctionImport.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

FunctionImport.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Function':
      this.Function = attribute.value();
      break;
    case 'EntitySet':
      this.EntitySet = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in FunctionImport '+entityName);
      break;
  }
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
