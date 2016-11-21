const ParserCommon = require('./ParserCommon');

function Record(xml) {
  this.Annotations = {};
  this.PropertyValues = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'},
    'PropertyValue': {parent: this.PropertyValues, nameProp: 'Property'}
  };
  this.validAttributes = {
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'Record');
  return this;
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
