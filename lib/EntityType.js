const assert = require('assert');

const Annotation = require('./Annotation');
const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function EntityType(xml) {
  this._key = null;
  this.Annotations = {};
  this.Properties = {};
  var name = xml.attr('Name').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element') {
      this.parseElement(children[i], name);
    }
    else if(elemType === 'text') {
      var text = children[i].toString().trim();
      if(text.length !== 0) {
        throw new Error('Unknown text element in EntityType! Text = "'+text+'"');
      }
    }
    else {
      throw new Error('Unknown element type '+elemType+' in EntityType '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  if(this._key !== null)
  {
    var propNames = this._key.find('.//*[local-name()="PropertyRef"]/@Name');
    for(var i = 0; i < propNames.length; i++)
    {
      var name = propNames[i].value();
      if(this[name] !== undefined) {
        this[name].IsKey = true;
      }
    }
  }
  delete this._key;
  return this;
}

EntityType.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Key':
      if(this._key !== null) {
        throw new Error('More than one key on EntityType '+entityName);
      }
      this._key = element;
      break;
    case 'Property':
      var name = element.attr('Name').value();
      this.Properties[name] = new Property(element);
      break;
    case 'NavigationProperty':
      var name = element.attr('Name').value();
      this.Properties[name] = new NavigationProperty(element);
      break;
    case 'Annotation':
      var name = element.attr('Term').value();
      this.Annotations[name] = new Annotation(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

EntityType.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'BaseType':
      this.BaseType = attribute.value();
      break;
    case 'Abstract':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in EntityType '+entityName);
      break;
  }
}

EntityType.prototype.parseBooleanAttribute = function(xml, name) {
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

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
