const Action = require('./Action');

class Function extends Action {
  constructor() {
    super();

    this.addAttributeHandler('IsComposable', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('EntitySetPath', this.addAttributeToObj, {});
  }
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
