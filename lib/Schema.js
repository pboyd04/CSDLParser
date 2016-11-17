const ParserCommon = require('./ParserCommon');

function Schema(xml) {
  this.Annotations = {};
  this._Name = xml.attr('Namespace').value();
  var parseElement = this.parseElement.bind(this);
  ParserCommon.parseEntity(xml, 'Schema', parseElement);
}

Schema.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Action':
      var name = element.attr('Name').value();
      var Action = require('./Action');
      this[name] = new Action(element);
      break;
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    case 'ComplexType':
      var name = element.attr('Name').value();
      var ComplexType = require('./ComplexType');
      this[name] = new ComplexType(element);
      break;
    case 'EntityContainer':
      var name = element.attr('Name').value();
      var EntityContainer = require('./EntityContainer');
      this[name] = new EntityContainer(element);
      break; 
    case 'EntityType':
      var name = element.attr('Name').value();
      var EntityType = require('./EntityType');
      this[name] = new EntityType(element);
      break; 
    case 'EnumType':
      var name = element.attr('Name').value();
      var EnumType = require('./EnumType');
      this[name] = new EnumType(element);
      break;
    case 'Function':
      var name = element.attr('Name').value();
      var Function = require('./Function');
      this[name] = new Function(element);
      break;
    case 'Term':
      var name = element.attr('Name').value();
      var Term = require('./Term');
      this[name] = new Term(element);
      break;
    case 'TypeDefinition':
      var name = element.attr('Name').value();
      var TypeDefinition = require('./TypeDefinition');
      this[name] = new TypeDefinition(element);
      break;
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
}

module.exports = Schema;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
