const ParserCommon = require('./ParserCommon');

function Record(xml) {
  this.Annotations = {};
  this.PropertyValues = {};

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'Record', parseElement, parseAttribute);
  return this;
}

Record.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    case 'PropertyValue':
      var name = element.attr('Property').value();
      var PropertyValue = require('./PropertyValue');
      this.PropertyValues[name] = new PropertyValue(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Record.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    default:
      throw new Error('Unknown attribute name '+attrName+' in Record');
      break;
  }
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
