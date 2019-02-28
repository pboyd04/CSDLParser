const Parameter = require('./Parameter');

class Property extends Parameter {
  constructor() {
    super();
    this.addAttributeHandler('DefaultValue', this.addAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = Property;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
