const ParserCommon = require('./ParserCommon');

class EntitySet extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};
    this.NaviagtionPropertyBindings = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'},
      'NavigationPropertyBinding': {parent: this.NaviagtionPropertyBindings, nameProp: 'Path'}
    };
    this.validAttributes = {
      'EntityType': {},
      'Name': {alreadyHandeled: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
