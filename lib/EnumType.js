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
  this.Members[name] = {};
  if(value === null)
  {
    this.Members[name].value = this._index++;
  }
  else
  {
    this.Members[name].value = value.value()*1;
    this._index = value.value()*1;
  }
  var children = element.childNodes();
  for(var i = 0; i < children.length; i++) {
    if(children[i].type() === 'element' && children[i].name() === 'Annotation') {
      if(this.Members[name].Annotations === undefined) {
        this.Members[name].Annotations = {};
      }
      var type = require('./Annotation');
      var annotation = new type(children[i]);
      this.Members[name].Annotations[annotation.Name] = annotation;
    }
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
