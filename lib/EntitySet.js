const ParserCommon = require('./ParserCommon');

function EntitySet(xml) {
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

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'EntitySet', 'Name');

  return this;
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
