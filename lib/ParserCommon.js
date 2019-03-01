'use strict'
/* eslint global-require: 0 */

class ParserCommon { 
  init(element) {
    let entityTypeName = this.constructor.name;
    this.parseName(element);

    if(this.attributeHandlers !== undefined || this.elementHandlers !== undefined) {
      this.parseEntity(element, entityTypeName);
      delete this.attributeHandlers;
      delete this.elementHandlers;
    }
    if(this.postInitCleanup !== undefined) {
      this.postInitCleanup();
    }
  }

  parseName(element) {
    if(this.nameAttr !== undefined) {
      if(this.nameAttrLocation === undefined) {
        this.nameAttrLocation = 'Name';
      }
      this[this.nameAttrLocation] = element.attr[this.nameAttr];
      delete this.nameAttr;
      delete this.nameAttrLocation;
    }
  }

  parseEntity(element, entityName) {
    let me = this;
    if(element.val.trim().length !== 0) {
      throw new Error('Unknown text element in '+entityName+'! Text = "'+element.val+'"');
    }
    element.eachChild(function(child) {
      me.parseChildElement(child);
    });

    for(let name in element.attr) {
      this.parseAttribute(name, element.attr[name]);
    }
  }

  parseChildElement(element) {
    let elemName = element.name;
    if(this.elementHandlers === undefined || this.elementHandlers[elemName] === undefined) {
      throw new Error('Unknown element name '+elemName+' in Parent '+this.constructor.name);
    }
    let handler = this.elementHandlers[elemName];
    handler.func(element, handler.data);
  }

  parseAttribute(name, value) {
    if(this.attributeHandlers === undefined || this.attributeHandlers[name] === undefined) {
      throw new Error('Unknown attribute name '+name+' in Parent '+this.constructor.name);
    }
    let handler = this.attributeHandlers[name];
    if(handler.func !== null) {
      handler.func(name, value, handler.data);
    }
  }

  parseBooleanAttribute(entity, value, name) {
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

  addElementHandler(elementName, func, funcData) {
    if(this.elementHandlers === undefined) {
      this.elementHandlers = {};
    }
    let funcVar = func;
    funcVar = func.bind(this);
    this.elementHandlers[elementName] = {func: funcVar, data: funcData};
  }

  addAttributeHandler(attributeName, func, funcData) {
    if(this.attributeHandlers === undefined) {
      this.attributeHandlers = {};
    }
    let funcVar = func;
    if(func) {
      funcVar = func.bind(this);
    }
    this.attributeHandlers[attributeName] = {func: funcVar, data: funcData}; 
  }

  getObjectFromElement(element) {
    let elemName = element.name; 
    let type = require('./'+elemName);
    let child = new type();
    child.init(element);
    return child;
  }

  addElementToObj(element, data) {
    let par = data.parent || this;
    let name = data.name;
    if(name === undefined && data.nameProp !== undefined) {
      name = element.attr[data.nameProp];
    }
    par[name] = this.getObjectFromElement(element);
  }

  addElementToArray(element, data) {
    let par = data.parent;
    par.push(this.getObjectFromElement(element));
  }

  addStringToObj(element, data) {
    let par = data.parent || this;
    let name = data.name;
    par[name] = element.val;
  }

  addStringToArray(element, data) {
    let par = data.parent;
    par.push(element.val);
  }

  addXMLToObj(element, data) {
    let par = data.parent || this;
    let name = data.name;
    par[name] = element;
  }

  addAttributeToObj(name, value, data) {
    let par = data.parent || this;
    if(data.name) {
      name = data.name;
    }
    par[name] = value;
  }

  addBoolAttributeToObj(name, value, data) {
    let par = data.parent || this;
    this.parseBooleanAttribute(par, value, name)
  }

  addIntAttributeToObj(name, value, data) {
    this.addAttributeToObj(name, value*1, data);
  }
}

module.exports = ParserCommon;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
