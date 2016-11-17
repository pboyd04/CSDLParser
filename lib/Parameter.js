const ParserCommon = require('./ParserCommon');

function Parameter(xml) {
  this.Name = xml.attr('Name').value();
  this.Annotations = {};

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'Action', parseElement, parseAttribute);
  return this;
}

Parameter.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName+' in Parameter '+this.Name);
      break;
  }
}

Parameter.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
     case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
    case 'Unicode':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Parameter '+this.Name);
      break;
  }
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
