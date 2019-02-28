const ParserCommon = require('./ParserCommon');

class Annotation extends ParserCommon {
  constructor() {
    super();
    this.addElementHandler('Collection', this.addElementToObj, {name: 'Collection'});
    this.addElementHandler('Record', this.addElementToObj, {name: 'Record'});
    this.addElementHandler('String', this.addStringToObj, {name: 'String'});

    this.addAttributeHandler('Term', null, {});
    this.addAttributeHandler('Qualifier', this.addAttributeToObj, {});
    this.addAttributeHandler('String', this.addAttributeToObj, {});
    this.addAttributeHandler('EnumMember', this.addAttributeToObj, {});
    this.addAttributeHandler('Bool', this.addBoolAttributeToObj, {});
    this.addAttributeHandler('Int', this.addIntAttributeToObj, {});
    this.nameAttr = 'Term';
  }
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
