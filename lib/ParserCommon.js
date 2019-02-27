'use strict'

class ParserCommon { 
  init(element, nameAttr, nameAttrLocation) {
    let entityTypeName = this.constructor.name;
    if(nameAttr !== undefined) {
      if(nameAttrLocation === undefined) {
        nameAttrLocation = 'Name';
      }
      this[nameAttrLocation] = element.attr[nameAttr];
    }

    if(this.validElements !== undefined || this.validAttributes !== undefined) {
      this.parseEntity(element, entityTypeName);
      delete this.validElements;
      delete this.validAttributes;
    }
  }

  parseEntity(element, entityName) {
    let me = this;
    if(element.val.trim().length !== 0) {
      throw new Error('Unknown text element in '+entityName+'! Text = "'+element.val+'"');
    }
    element.eachChild(function(child, index, array) {
      me.parseChildElement(child);
    });

    for(let name in element.attr) {
      this.parseAttribute(name, element.attr[name]);
    }
  }

  parseChildElement(element) {
    let elemName = element.name;
    if(this.validElements === undefined || this.validElements[elemName] === undefined) {
      throw new Error('Unknown element name '+elemName+' in Parent '+this.constructor.name);
    }
    let options = this.validElements[elemName];
    if(options.parent === undefined) {
      options.parent = this;
    }
    if(options.helperFunc !== undefined) {
      options.helperFunc(element);
      return;
    }
    let name = false;
    if(options.name !== undefined) {
      name = options.name;
    }
    else if(options.nameProp !== undefined) {
      name = element.attr[options.nameProp];
    }
    if(options.passthru === true) {
      options.parent[name] = element;
      return;
    }
    if(name === false) {
      if(options.getText === true) {
        options.parent.push(element.val);
        return;
      }
      let type = require('./'+elemName);
      options.parent.push(new type(element));
      return;
    }
    if(options.getText === true) {
      options.parent[name] = element.val;
      return;
    }
    var type = require('./'+elemName);
    options.parent[name] = new type(element);
  }

  parseAttribute(name, value) {
    if(this.validAttributes === undefined || this.validAttributes[name] === undefined) {
      throw new Error('Unknown attribute name '+name);
    }
    let options = this.validAttributes[name];
    if(options.alreadyHandeled === true) {
      return;
    }
    if(options.parent === undefined) {
      options.parent = this;
    }
    if(options.name === undefined) {
      options.name = name;
    }
    if(options.bool === true) {
      this.parseBooleanAttribute(options.parent, value, options.name);
    }
    else if(options.integer === true) {
      options.parent[options.name] = value*1;
    }
    else {
      options.parent[options.name] = value;
      if(options.helperFunc !== undefined) {
        options.parent[options.name] = options.helperFunc(options.parent[options.name]);
      }
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
}

module.exports = ParserCommon;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
