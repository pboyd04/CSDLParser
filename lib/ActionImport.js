const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function ActionImport(xml) {
  this.Annotations = {};
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'ActionImport', parseElement, parseAttribute);
  return this;
}

ActionImport.prototype.parseElement = function(element) {
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

ActionImport.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Action':
      this.Action = attribute.value();
      break;
    case 'EntitySet':
      this.EntitySet = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in ActionImport '+this.Name);
      break;
  }
}

module.exports = ActionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
