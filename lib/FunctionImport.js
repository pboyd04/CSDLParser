const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function FunctionImport(xml) {
  this.Annotations = {};
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'FunctionImport', parseElement, parseAttribute);
  return this;
}

FunctionImport.prototype.parseElement = function(element, entityName) {
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

FunctionImport.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'EntitySet':
    case 'Function':
      this[attrName] = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in FunctionImport '+this.Name);
      break;
  }
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
