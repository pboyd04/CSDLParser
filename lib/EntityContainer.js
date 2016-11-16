const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const EntitySet = require('./EntitySet');
const Singleton = require('./Singleton');
const FunctionImport = require('./FunctionImport');
const ActionImport = require('./ActionImport');

function EntityContainer(xml) {
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'EntityContainer', parseElement, parseAttribute);
  return this;
}

EntityContainer.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'EntitySet':
      var name = element.attr('Name').value();
      this[name] = new EntitySet(element);
      break;
    case 'Singleton':
      var name = element.attr('Name').value();
      this[name] = new Singleton(element);
      break;
    case 'ActionImport':
      var name = element.attr('Name').value();
      this[name] = new ActionImport(element);
      break;
    case 'FunctionImport':
      var name = element.attr('Name').value();
      this[name] = new FunctionImport(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EntityContainer.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntityContainer '+this.Name);
      break;
  }
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
