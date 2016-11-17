const ParserCommon = require('./ParserCommon');

function PropertyValue(xml) {
  this.Name = xml.attr('Property').value();
  this.Annotations = {};

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'PropertyValue', parseElement, parseAttribute);
  return this;
}

PropertyValue.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName+' in PropertyValue '+this.Name);
      break;
  }
}

PropertyValue.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
     case 'Property':
      //Already used... drop on floor
      break;
    case 'String':
    case 'Path':
      this[attrName] = attribute.value();
      break;
    case 'Bool':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in PropertyValue '+this.Name);
      break;
  }
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
