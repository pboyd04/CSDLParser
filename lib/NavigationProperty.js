const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function NavigationProperty(xml) {
  this.Name = xml.attr('Name').value();
  this.Annotations = {};

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'NavigationProperty', parseElement, parseAttribute);
  return this;
}

NavigationProperty.prototype.parseElement = function(element, entityName) {
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

NavigationProperty.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
    case 'ContainsTarget':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in NavigationProperty '+entityName);
      break;
  }
}

module.exports = NavigationProperty;
