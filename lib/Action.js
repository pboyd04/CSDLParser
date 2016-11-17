const assert = require('assert');

const ParserCommon = require('./ParserCommon');

const Parameter = require('./Parameter');
const ReturnType = require('./ReturnType');

function Action(xml) {
  this.Name = xml.attr('Name').value();
  this.Annotations = {};
  this.Parameters = {};
  this.ReturnType = null;

  var parseElement = this.parseElement.bind(this);
  var parseAttribute = this.parseAttribute.bind(this);
  ParserCommon.parseEntity(xml, 'Action', parseElement, parseAttribute);
  return this;
}

Action.prototype.parseElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Annotation':
      var name = element.attr('Term').value();
      var Annotation = require('./Annotation');
      this.Annotations[name] = new Annotation(element);
      break;
    case 'Parameter':
      var name = element.attr('Name').value();
      this.Parameters[name] = new Parameter(element);
      break;
    case 'ReturnType':
      if(this.ReturnType !== null) {
        throw new Error('Multiple ReturnTypes for Action '+this.Name+'!');
      }
      this.ReturnType = new ReturnType(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Action.prototype.parseAttribute = function(attribute) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'IsBound':
      ParserCommon.parseBooleanAttribute(this, attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Action '+this.Name);
      break;
  }
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
