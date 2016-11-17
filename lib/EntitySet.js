const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const NavigationPropertyBinding = require('./NavigationPropertyBinding');
const Annotation = require('./Annotation');

function EntitySet(xml) {
  this.Annotations = {};
  this.NaviagtionPropertyBindings = {};
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'EntitySet', parseElement, parseAttribute);
  return this;
}

EntitySet.prototype.parseElement = function(element) {
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

EntitySet.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'EntityType':
      this.EntityType = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntitySet '+this.Name);
      break;
  }
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
