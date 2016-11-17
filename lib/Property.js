const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function Property(xml) {
  this.Name = xml.attr('Name').value();
  this.Annotations = {};

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'Property', parseElement, parseAttribute);
  return this;
}

Property.prototype.parseElement = function(element, entityName) {
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

Property.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
    case 'DefaultValue':
      this[attrName] = attribute.value();
      break;
    case 'Nullable':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Property '+entityName);
      break;
  }
}

module.exports = Property;
