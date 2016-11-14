const assert = require('assert');

const EntitySet = require('./EntitySet');
const Singleton = require('./Singleton');
const FunctionImport = require('./FunctionImport');
const ActionImport = require('./ActionImport');

function EntityContainer(metadata, xml) {
  this._metadata = metadata;
  this.EntitySets = {};
  this.Singletons = {};
  this.ActionImports = {};
  this.FunctionImports = {};
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
      throw new Error('Unknown element type in EntityContainer '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

EntityContainer.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'EntitySet':
      var name = element.attr('Name').value();
      this.EntitySets[name] = new EntitySet(this, element);
      break;
    case 'Singleton':
      var name = element.attr('Name').value();
      this.Singletons[name] = new Singleton(this, element);
      break;
    case 'ActionImport':
      var name = element.attr('Name').value();
      this.ActionImports[name] = new ActionImport(this, element);
      break;
    case 'FunctionImport':
      var name = element.attr('Name').value();
      this.FunctionImports[name] = new FunctionImport(this, element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EntityContainer.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntityContainer '+entityName);
      break;
  }
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
