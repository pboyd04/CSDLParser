const ParserCommon = require('./ParserCommon');

function ReturnType(xml) {
  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'NavigationProperty', parseElement, parseAttribute);
  return this;
}

ReturnType.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

ReturnType.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in ReturnType');
      break;
  }
}

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
