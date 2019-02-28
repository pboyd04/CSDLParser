const AnnotatedObject = require('./AnnotatedObject');

class EntitySet extends AnnotatedObject {
  constructor() {
    super();
    this.NaviagtionPropertyBindings = {};

    this.addElementHandler('NavigationPropertyBinding', this.addElementToObj, {parent: this.NaviagtionPropertyBindings, nameProp: 'Path'});

    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('EntityType', this.addAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
