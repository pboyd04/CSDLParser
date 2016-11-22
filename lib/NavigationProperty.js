const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function NavigationProperty(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Property', 'Name');

  return this;
}

module.exports = NavigationProperty;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
