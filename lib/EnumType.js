const ParserCommon = require('./ParserCommon');

function EnumType(xml) {
  this._index = 0;
  this.Members = {};
  this.Annotations = {};
  this.Name = xml.attr('Name').value();

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'EnumType', parseElement, parseAttribute);
  delete this._index;
  return this;
}

EnumType.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    case 'Member':
      var name = element.attr('Name').value();
      var value = element.attr('Value');
      if(value === null)
      {
        this.Members[name] = this._index++;
      }
      else
      {
        this.Members[name] = value.value()*1;
        this._index = value.value()*1;
      }
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EnumType.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'IsFlags':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EnumType '+entityName);
      break;
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
