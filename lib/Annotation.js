const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const Collection = require('./Collection')

function Annotation(xml) {
  this.Name = xml.attr('Term').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'Annotation', parseElement, parseAttribute);
  return this;
}

Annotation.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Collection':
      this.Collection = new Collection(element);
      break;
    case 'String':
      this.String = element.text();
      break;
    case 'Record':
      var Record = require('./Record');
      this.Record = new Record(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Annotation.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Term':
      //Already used... drop on floor
      break;
    case 'Int':
      this[attrName] = attribute.value()*1;
      break;
    case 'Bool':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    case 'String':
    case 'EnumMember':
      this[attrName] = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Annotation '+this.Name);
      break;
  }
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
