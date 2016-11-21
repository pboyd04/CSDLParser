'use strict'
/** Initialize an entity. Bind this function to the object before you call it!*/
function initEntity(element, entityTypeName, nameAttr, nameAttrLocation) {
  if(this === global) {
    throw new Error('Function not bound before call!');
  }
  if(nameAttr !== undefined) {
    if(nameAttrLocation === undefined) {
      nameAttrLocation = 'Name';
    }
    this[nameAttrLocation] = element.attr(nameAttr).value();
  }
  if(this.validElements !== undefined || this.validAttributes !== undefined) {
    parseEntity(element, entityTypeName, defaultElementParse.bind(this), defaultAttributeParse.bind(this));
    delete this.validElements;
    delete this.validAttributes;
  }
}

function parseEntity(element, entityName, elementCallback, attributeCallback) {
  if(elementCallback !== undefined) {
    var children = element.childNodes();
    for(var i = 0; i < children.length; i++) {
      switch(children[i].type()) {
        case 'element':
          elementCallback(children[i]);
          break;
        case 'text':
          var text = children[i].toString().trim();
          if(text.length !== 0) {
            throw new Error('Unknown text element in '+entityName+'! Text = "'+text+'"');
          }
          break;
        case 'comment':
          //Ignore comments
          break;
        default:
          throw new Error('Unknown element type '+elemType+' in '+entityName+'!');
          break;
      }
    }
  }
  if(attributeCallback !== undefined) {
    var attributes = element.attrs();
    for(var i = 0; i < attributes.length; i++)
    {
      attributeCallback(attributes[i]);
    } 
  }
}

function defaultElementParse(element) {
  var elemName = element.name();
  if(this.validElements !== undefined && this.validElements[elemName] !== undefined) {
    var options = this.validElements[elemName];
    if(options.parent === undefined) {
      options.parent = this;
    }
    if(options.helperFunc !== undefined) {
      options.helperFunc(element);
      return;
    }
    var name = false;
    if(options.name !== undefined) {
      name = options.name;
    }
    else if(options.nameProp !== undefined) {
      name = element.attr(options.nameProp).value();
    }
    if(options.passthru === true) {
      options.parent[name] = element;
      return;
    }
    var type = require('./'+elemName);
    options.parent[name] = new type(element);
  }
  else {
    throw new Error('Unknown element name '+elemName);
  }
}

function defaultAttributeParse(attribute) {
  var attrName = attribute.name();
  if(this.validAttributes !== undefined && this.validAttributes[attrName] !== undefined) {
    var options = this.validAttributes[attrName];
    if(options.alreadyHandeled === true) {
      return;
    }
    if(options.parent === undefined) {
      options.parent = this;
    }
    if(options.name === undefined) {
      options.name = attrName;
    }
    if(options.bool === true) {
      parseBooleanAttribute(options.parent, attribute, options.name);
    }
    else if(options.integer === true) {
      options.parent[options.name] = attribute.value()*1;
    }
    else {
      options.parent[options.name] = attribute.value();
      if(options.helperFunc !== undefined) {
        options.parent[options.name] = helperFunc(options.parent[options.name]);
      }
    }
  }
  else {
    throw new Error('Unknwon attribute name '+attrName);
  }
}

function parseBooleanAttribute(entity, attr, name) {
  var value = attr.value();
  if(value === 'true') {
    entity[name] = true;
  }
  else if(value === 'false') {
    entity[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports.initEntity = initEntity;
module.exports.parseEntity = parseEntity;
module.exports.parseBooleanAttribute = parseBooleanAttribute;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
