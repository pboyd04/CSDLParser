const AnnotatedObject = require('./AnnotatedObject');

class NavigationProperty extends AnnotatedObject {
  constructor() {
    super();

    //TODO ReferentialConstraint handling
    //TODO OnDelete Handling
    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('Type', this.addAttributeToObj, {});
    this.addAttributeHandler('Nullable', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('Partner', this.addAttributeToObj, {});
    this.addAttributeHandler('ContainsTarget', this.addBoolAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = NavigationProperty;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
