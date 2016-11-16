const assert = require('assert');
const Parameter = require('./Parameter');
const ReturnType = require('./ReturnType');

function Function(xml) {
  var name = xml.attr('Name').value();
  this.Parameters = {};
  this.ReturnType = null;
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i], name);
    }
    else
    {
      throw new Error('Unknown element type in Action '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  } 
  return this;
}

Function.prototype.parseElement = function(element, actionName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Parameter':
      var name = element.attr('Name').value();
      this.Parameters[name] = new Parameter(element);
      break;
    case 'ReturnType':
      if(this.ReturnType !== null) {
        throw new Error('Multiple ReturnTypes for Function '+actionName+'!');
      }
      this.ReturnType = new ReturnType(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Function.prototype.parseAttribute = function(attribute, actionName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'IsBound':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    case 'EntitySetPath':
      this.EntitySetPath = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Function '+actionName);
      break;
  }
}

Function.prototype.parseBooleanAttribute = function(xml, name) {
  var value = xml.value();
  if(value === 'true') {
    this[name] = true;
  }
  else if(value === 'false') {
    this[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
