const ParserCommon = require('./ParserCommon');

function EnumType(xml) {
  this._index = 0;
  this.Members = {};
  this.Annotations = {};

  this.validElements = {
    'Annotation': {parent: this.Annotations, nameProp: 'Term'},
    'Member': {parent: this.Parameters, helperFunc: this.memberHelper.bind(this)}
  };
  this.validAttributes = {
    'IsFlags': {bool: true},
    'Name': {alreadyHandeled: true}
  };

  var init = ParserCommon.initEntity.bind(this);
  init(xml, 'EnumType', 'Name');
  delete this._index;
  return this;
}

EnumType.prototype.memberHelper = function(element) {
  var name = element.attr('Name').value();
  var value = element.attr('Value');
  if(value === null)
  {
    this.Members[name] = this._index++;
  }
  else
  {
    this.Members[name] = value.value()*1;
    this._index = value.value()*1;
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
