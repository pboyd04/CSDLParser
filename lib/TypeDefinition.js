const assert = require('assert');

const Annotation = require('./Annotation');

function TypeDefinition(xml) {
  this.Annotations = {};
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
        throw new Error('Unknown text element in TypeDefinition '+name+'! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in TypeDefinition '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

TypeDefinition.prototype.parseElement = function(element, entityName) {
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

TypeDefinition.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'UnderlyingType':
      this[attrName] = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in TypeDefinition '+entityName);
      break;
  }
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
