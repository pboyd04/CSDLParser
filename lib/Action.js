const AnnotatedObject = require('./AnnotatedObject');

class Action extends AnnotatedObject {
  constructor() {
    super();
    this.Parameters = {};
    this.ReturnType = null;

    this.addElementHandler('Parameter', this.addElementToObj, {parent: this.Parameters, nameProp: 'Name'});
    this.addElementHandler('ReturnType', this.addElementToObj, {name: 'ReturnType'});

    this.addAttributeHandler('IsBound', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('Name', null, {});

    this.nameAttr = 'Name';
  }
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
