const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function Singleton(xml) {
  this.Annotations = {};
  this.Name = xml.attr('Name').value();
  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'NavigationProperty', parseElement, parseAttribute);
  return this;
}

Singleton.prototype.parseElement = function(element) {
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

Singleton.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntitySet '+this.Name);
      break;
  }
}

module.exports = Singleton;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
