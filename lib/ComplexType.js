const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');
const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function ComplexType(xml) {
  this.Properties = {};
  this.Annotations = {};
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'ComplexType', parseElement, parseAttribute);
  return this;
}

ComplexType.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Property':
      var name = element.attr('Name').value();
      this.Properties[name] = new Property(element);
      break;
    case 'NavigationProperty':
      var name = element.attr('Name').value();
      this.Properties[name] = new NavigationProperty(element);
      break;
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

ComplexType.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'BaseType':
      this.BaseType = attribute.value();
      break;
    case 'Abstract':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in ComplexType '+this.Name);
      break;
  }
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
