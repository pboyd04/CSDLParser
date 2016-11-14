const assert = require('assert');
const NavigationPropertyBinding = require('./NavigationPropertyBinding');
const Annotation = require('./Annotation');

function EntitySet(metadata, xml) {
  this._metadata = metadata;
  this.Annotations = {};
  this.NaviagtionPropertyBindings = {};
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

EntitySet.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
      break;
    case 'NavigationPropertyBinding':
      var name = element.attr('Path').value();
      this.NaviagtionPropertyBindings[name] = new NavigationPropertyBinding(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EntitySet.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'EntityType':
      this.EntityType = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntitySet '+entityName);
      break;
  }
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
