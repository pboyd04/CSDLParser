const ParserCommon = require('./ParserCommon');

class EntityContainer extends ParserCommon {
  constructor() {
    super();
    this.addElementHandler('EntitySet', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('Singleton', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('ActionImport', this.addElementToObj, {nameProp: 'Name'});
    this.addElementHandler('FunctionImport', this.addElementToObj, {nameProp: 'Name'});

    this.addAttributeHandler('Name', null, {});
    this.addAttributeHandler('Extends', this.addAttributeToObj, {});
    this.nameAttr = 'Name';
  }
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
