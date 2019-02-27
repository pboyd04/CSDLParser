const ParserCommon = require('./ParserCommon');

class NavigationProperty extends ParserCommon {
  constructor(element) {
    super();
    this.Annotations = {};

    this.validElements = {
      'Annotation': {parent: this.Annotations, nameProp: 'Term'}
      //TODO ReferentialConstraint handling
      //TODO OnDelete Handling
    };
    this.validAttributes = {
      'Name': {alreadyHandeled: true},
      'Type': {},
      'Nullable': {bool: true},
      'Partner': {},
      'ContainsTarget': {bool: true}
    };

    this.init(element, 'Name');
  }
}

module.exports = NavigationProperty;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
