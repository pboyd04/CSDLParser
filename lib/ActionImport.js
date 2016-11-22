const ParserCommon = require('./ParserCommon');

const Annotation = require('./Annotation');

function ActionImport(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'Action': {},
    'EntitySet': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'ActionImport', 'Name');
  return this;
}

module.exports = ActionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
