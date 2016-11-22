const ParserCommon = require('./ParserCommon');

function Singleton(xml) {
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'}
  };
  this.validAttributes = {
    'Type': {},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Singleton', 'Name');
  return this;
}

module.exports = Singleton;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
